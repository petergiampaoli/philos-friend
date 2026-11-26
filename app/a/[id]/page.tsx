import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { PhoneChat } from "@/components/phone-chat";
import { conversationPairViews } from "@/lib/conversation";
import { loadConversation } from "@/lib/conversation-store";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const conversation = await loadConversation(id);
  if (!conversation) return { title: "Answer not found — Philos-Friend" };

  const description =
    conversation.pairs[0]?.lens.affirmation ??
    conversation.pairs[0]?.lens.theory ??
    conversation.question;

  return {
    title: `${conversation.question} — Philos-Friend`,
    description: description.slice(0, 180),
    robots: { index: false, follow: false },
  };
}

export default async function SharedAnswerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const conversation = await loadConversation(id);
  if (!conversation) notFound();

  const pairs = conversationPairViews(conversation);
  const requestHeaders = await headers();
  const host = requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
  const shareUrl = host
    ? `${protocol}://${host}/a/${conversation.id}`
    : `/a/${conversation.id}`;

  return (
    <div className="phone-share-page">
      <PhoneChat
        initialQuestion={conversation.question}
        initialPairs={pairs}
        shareUrl={shareUrl}
        readOnly
      />
    </div>
  );
}
