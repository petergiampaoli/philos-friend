import { startConversation, addConversationPair } from "@/lib/pair";
import {
  isConversationId,
  loadConversation,
  saveConversation,
} from "@/lib/conversation-store";
import {
  resolveConversationPair,
  type PairResponse,
} from "@/lib/conversation";
import { checkRateLimit, clientKey, rateLimitHeaders } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

function serverTiming(timing: PairResponse["timings"]): string {
  return [
    timing.analysisMs !== undefined ? `analysis;dur=${timing.analysisMs}` : null,
    `select;dur=${timing.selectionMs}`,
    `writer;dur=${timing.writerMs}`,
    `green;dur=${timing.greenMs}`,
    `total;dur=${timing.totalMs}`,
  ]
    .filter(Boolean)
    .join(", ");
}

function logTiming(label: string, response: PairResponse): void {
  const timing = response.timings;
  const parts = [
    `[advise] ${label}`,
    `conversation=${response.conversationId}`,
    `quote=${response.pair.thinker.id}:${response.pair.quote.id}`,
    `model=${response.model}`,
    timing.analysisMs !== undefined ? `analysis=${timing.analysisMs}ms` : "analysis=reused",
    `select=${timing.selectionMs}ms`,
    `writer=${timing.writerMs}ms`,
    `green=${timing.greenMs}ms`,
    `total=${timing.totalMs}ms`,
    timing.fallback ? "fallback=true" : null,
  ].filter(Boolean);
  console.info(parts.join(" "));
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Send a JSON body with a prompt." }, { status: 400 });
  }

  const payload = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const rawConversationId =
    typeof payload.conversationId === "string" ? payload.conversationId.trim() : "";

  const limit = checkRateLimit(`advise:${clientKey(request)}`);
  if (!limit.ok) {
    return Response.json(
      {
        error: "You have asked a lot of questions in the last hour. Take a breath, then try again.",
      },
      {
        status: 429,
        headers: {
          ...rateLimitHeaders(limit),
          "retry-after": String(Math.max(1, Math.ceil((limit.resetAt - Date.now()) / 1000))),
        },
      },
    );
  }

  try {
    if (rawConversationId) {
      if (!isConversationId(rawConversationId)) {
        return Response.json({ error: "That conversation does not exist." }, { status: 404 });
      }

      const conversation = await loadConversation(rawConversationId);
      if (!conversation) {
        return Response.json({ error: "That conversation does not exist." }, { status: 404 });
      }

      const requestedIndex =
        typeof payload.pairIndex === "number" && Number.isInteger(payload.pairIndex)
          ? payload.pairIndex
          : conversation.pairs.length;

      if (requestedIndex < 0 || requestedIndex >= 3) {
        return Response.json(
          { error: "This conversation has no more quotes to add." },
          { status: 400 },
        );
      }
      if (requestedIndex > conversation.pairs.length) {
        return Response.json(
          { error: "The next quote must be requested in order." },
          { status: 409 },
        );
      }

      const before = conversation.pairs.length;
      const result = await addConversationPair(conversation, requestedIndex);
      if (conversation.pairs.length > before) {
        await saveConversation(result.conversation);
      }

      const origin =
        process.env.NEXT_PUBLIC_APP_URL?.replace(/\/+$/, "") || new URL(request.url).origin;
      const response: PairResponse = {
        conversationId: result.conversation.id,
        question: result.conversation.question,
        pair: result.pair,
        pairIndex: result.timing.pairIndex,
        remaining: Math.max(0, 3 - result.conversation.pairs.length),
        shareUrl: `${origin}/a/${result.conversation.id}`,
        timings: result.timing,
        mode: result.conversation.mode,
        provider: result.conversation.provider,
        model: result.conversation.model,
      };

      logTiming(`pair ${result.timing.pairIndex + 1}`, response);

      return Response.json(response, {
        headers: {
          "cache-control": "no-store",
          "server-timing": serverTiming(result.timing),
          ...rateLimitHeaders(limit),
        },
      });
    }

    const prompt =
      typeof payload.prompt === "string" ? payload.prompt.trim() : "";
    if (prompt.length < 3) {
      return Response.json(
        { error: "Ask an actual question — at least a few words." },
        { status: 400 },
      );
    }
    if (prompt.length > 2000) {
      return Response.json(
        { error: "That question is too long. Keep it under 2,000 characters." },
        { status: 400 },
      );
    }

    const history = Array.isArray(payload.history)
      ? payload.history
          .filter((item): item is string => typeof item === "string")
          .map((item) => item.trim().slice(0, 500))
          .filter(Boolean)
          .slice(-5)
      : [];

    const excludeThinkerIds = Array.isArray(payload.excludeThinkerIds)
      ? payload.excludeThinkerIds
          .filter((item): item is string => typeof item === "string")
          .map((item) => item.trim())
          .filter((item) => /^[a-z0-9-]+$/.test(item))
          .slice(0, 10)
      : [];

    const { conversation, timing } = await startConversation({
      question: prompt,
      history,
      excludedThinkerIds: excludeThinkerIds,
    });

    await saveConversation(conversation);

    const origin =
      process.env.NEXT_PUBLIC_APP_URL?.replace(/\/+$/, "") || new URL(request.url).origin;
    const pair = resolveConversationPair(conversation, conversation.pairs[0]);
    if (!pair) throw new Error("The first pair could not be resolved.");
    const response: PairResponse = {
      conversationId: conversation.id,
      question: conversation.question,
      pair,
      pairIndex: 0,
      remaining: Math.max(0, 3 - conversation.pairs.length),
      shareUrl: `${origin}/a/${conversation.id}`,
      timings: timing,
      mode: conversation.mode,
      provider: conversation.provider,
      model: conversation.model,
    };

    logTiming("new conversation", response);

    return Response.json(response, {
      headers: {
        "cache-control": "no-store",
        "server-timing": serverTiming(timing),
        ...rateLimitHeaders(limit),
      },
    });
  } catch (error) {
    console.error("[philos-friend] advise pair failed", error);
    return Response.json(
      { error: "The library dropped its notes. Try that question again." },
      { status: 500 },
    );
  }
}
