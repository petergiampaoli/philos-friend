import { AskClient } from "@/components/ask-client";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ prompt?: string }>;
}) {
  const params = await searchParams;
  const prompt = typeof params.prompt === "string" ? params.prompt : "";

  return <AskClient initialPrompt={prompt} />;
}
