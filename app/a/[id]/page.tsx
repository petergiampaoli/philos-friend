import Link from "next/link";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { QuoteCycle } from "@/components/quote-cycle";
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
    <div className="share-page">
      <div className="share-toolbar">
        <div>
          <p className="eyebrow">Shared answer</p>
          <p className="share-question">“{response.question}”</p>
        </div>
        <Link className="text-action" href="/">
          Ask your own
        </Link>
      </div>

      <QuoteCycle response={response} shareUrl={shareUrl} askAgainHref="/" />
    </div>
  );
}
