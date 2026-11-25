import { getPortrait } from "@/lib/portraits";

const SIZES = { sm: 34, md: 48, lg: 96 } as const;

export function Portrait({
  name,
  id,
  size = "md",
}: {
  name: string;
  id: string;
  size?: keyof typeof SIZES;
}) {
  const portrait = getPortrait(id);
  const dimension = SIZES[size];

  return (
    <img
      className={`portrait portrait-${size}`}
      src={portrait?.src ?? "/portraits/fallback.svg"}
      alt=""
      title={name}
      width={dimension}
      height={dimension}
      loading="lazy"
    />
  );
}
