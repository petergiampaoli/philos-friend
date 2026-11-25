import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { PhoneChat } from "@/components/phone-chat";
import { getAnswer } from "@/lib/answers";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const response = await getAnswer(id);
  if (!response) return { title: "Answer not found — Philos-Friend" };

  return {
    title: `${response.question} — Philos-Friend`,
    description: response.answer.thesis.slice(0, 180),
    robots: { index: false, follow: false },
  };
}

export default async function SharedAnswerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await getAnswer(id);
  if (!response) notFound();

  const requestHeaders = await headers();
  const host = requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
  const shareUrl = host ? `${protocol}://${host}/a/${response.id}` : `/a/${response.id}`;

  return (
    <div className="phone-share-page">
      <PhoneChat initialResponse={response} shareUrl={shareUrl} readOnly />
    </div>
  );
}
