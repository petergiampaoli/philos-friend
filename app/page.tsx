import { PhoneChat } from "@/components/phone-chat";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ prompt?: string }>;
}) {
  const params = await searchParams;
  const prompt = typeof params.prompt === "string" ? params.prompt : "";

  return <PhoneChat initialPrompt={prompt} />;
}
