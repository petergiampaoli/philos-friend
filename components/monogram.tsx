function initialsFor(name: string): string {
  const cleaned = name.replace(/\([^)]*\)/g, " ").replace(/\s+/g, " ").trim();
  const parts = cleaned
    .split(" ")
    .filter((part) => !["of", "the", "de", "van", "von", "al", "ibn", "and"].includes(part.toLowerCase()));

  if (parts.length >= 2) {
    return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
  }
  return (parts[0] ?? name).slice(0, 2).toUpperCase();
}

function toneFor(id: string): string {
  let hash = 0;
  for (let index = 0; index < id.length; index += 1) {
    hash = (hash * 31 + id.charCodeAt(index)) >>> 0;
  }
  return ["oxblood", "moss", "gold", "ink"][hash % 4] ?? "ink";
}

export function Monogram({
  name,
  id,
  size = "md",
}: {
  name: string;
  id: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <span
      className={`monogram monogram-${size}`}
      data-tone={toneFor(id)}
      aria-hidden="true"
      title={name}
    >
      {initialsFor(name)}
    </span>
  );
}
