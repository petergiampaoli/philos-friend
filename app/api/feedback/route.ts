import { getAnswer, isAnswerId, saveFeedback } from "@/lib/answers";
import { checkRateLimit, clientKey } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const limit = checkRateLimit(`feedback:${clientKey(request)}`, 120);
  if (!limit.ok) {
    return Response.json({ error: "Too much feedback at once." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Expected JSON." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return Response.json({ error: "Expected an object." }, { status: 400 });
  }

  const id = "id" in body && typeof body.id === "string" ? body.id : "";
  const value = "value" in body && (body.value === "up" || body.value === "down") ? body.value : null;

  if (!isAnswerId(id) || !value) {
    return Response.json({ error: "Invalid feedback." }, { status: 400 });
  }

  try {
    const answer = await getAnswer(id);
    if (!answer) {
      return Response.json({ error: "That answer is not in the library." }, { status: 404 });
    }
    await saveFeedback(id, value);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[philos-friend] could not record feedback", error);
    return Response.json({ error: "Could not record feedback." }, { status: 500 });
  }
}
