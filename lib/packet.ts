import type { PacketThinker } from "./schema";
import type { Retrieval } from "./retrieve";

export function buildPacket(retrieval: Retrieval): PacketThinker[] {
  return retrieval.candidates.map((thinker) => ({
    id: thinker.id,
    name: thinker.name,
    dates: thinker.dates,
    tradition: thinker.tradition,
    region: thinker.region,
    tags: thinker.tags,
    oneLine: thinker.oneLine,
    ideas: thinker.ideas,
    quotes: thinker.quotes,
  }));
}

export function packetNames(packet: PacketThinker[]): string[] {
  return packet.map((thinker) => thinker.name);
}

export function packetQuoteIds(packet: PacketThinker[]): Set<string> {
  return new Set(packet.flatMap((thinker) => thinker.quotes.map((quote) => quote.id)));
}

export function packetThinkerIds(packet: PacketThinker[]): Set<string> {
  return new Set(packet.map((thinker) => thinker.id));
}
