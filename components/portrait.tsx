import { getPortrait } from "@/lib/portraits";

const SIZES = { xs: 22, sm: 34, md: 48, lg: 96 } as const;

export function Portrait({
  name,
  id,
  size = "md",
  src,
  alt,
}: {
  name: string;
  id: string;
  size?: keyof typeof SIZES;
  src?: string;
  alt?: string;
}) {
  const portrait = getPortrait(id);
  const dimension = SIZES[size];

  return (
    <img
      className={`portrait portrait-${size}`}
      src={src ?? portrait?.src ?? "/portraits/fallback.svg"}
      alt={alt ?? ""}
      title={name}
      width={dimension}
      height={dimension}
      loading="lazy"
    />
  );
}
