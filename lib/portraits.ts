import portraitData from "@/data/portraits.json";

export type PortraitRecord = {
  src: string;
  pageTitle?: string;
  sourceUrl?: string;
  author?: string;
  license?: string;
  licenseUrl?: string;
  note?: string;
};

export const PORTRAITS = portraitData as Record<string, PortraitRecord>;

export function getPortrait(id: string): PortraitRecord | undefined {
  return PORTRAITS[id];
}
