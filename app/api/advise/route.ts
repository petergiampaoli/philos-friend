import { advise } from "@/lib/advise";
import { saveAnswer } from "@/lib/answers";
import { checkRateLimit, clientKey, rateLimitHeaders } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Send a JSON body with a prompt." }, { status: 400 });
  }

  const prompt =
    body && typeof body === "object" && "prompt" in body && typeof body.prompt === "string"
      ? body.prompt.trim()
      : "";

  if (prompt.length < 3) {
    return Response.json({ error: "Ask an actual question — at least a few words." }, { status: 400 });
  }

  if (prompt.length > 2000) {
    return Response.json(
      { error: "That question is too long for the porch. Keep it under 2,000 characters." },
      { status: 400 },
    );
  }

  const history =
    body &&
    typeof body === "object" &&
    "history" in body &&
    Array.isArray(body.history)
      ? body.history
          .filter((item): item is string => typeof item === "string")
          .map((item) => item.trim().slice(0, 500))
          .filter(Boolean)
          .slice(-5)
      : [];

  const excludeThinkerIds =
    body &&
    typeof body === "object" &&
    "excludeThinkerIds" in body &&
    Array.isArray(body.excludeThinkerIds)
      ? body.excludeThinkerIds
          .filter((item): item is string => typeof item === "string")
          .map((item) => item.trim())
          .filter((item) => /^[a-z0-9-]+$/.test(item))
          .slice(0, 10)
      : [];

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
    const result = await advise(prompt, { history, excludeThinkerIds });
    let shareUrl: string | undefined;

    try {
      await saveAnswer(result);
      const origin =
        process.env.NEXT_PUBLIC_APP_URL?.replace(/\/+$/, "") || new URL(request.url).origin;
      shareUrl = `${origin}/a/${result.id}`;
    } catch (storageError) {
      console.error("[philos-friend] could not persist answer", storageError);
    }

    return Response.json(
      { ...result, shareUrl },
      {
        headers: {
          "cache-control": "no-store",
          ...rateLimitHeaders(limit),
        },
      },
    );
  } catch (error) {
    console.error("[philos-friend] advise failed", error);
    return Response.json(
      { error: "The library dropped its notes. Try that question again." },
      { status: 500 },
    );
  }
}
