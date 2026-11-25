"use client";

import { useState } from "react";
import type { AdviseResponse, PacketThinker } from "@/lib/schema";
import { AnswerCard } from "./answer-card";
import { SourceDrawer } from "./source-drawer";

export function SharedAnswer({
  response,
  shareUrl,
}: {
  response: AdviseResponse;
  shareUrl?: string;
}) {
  const [drawer, setDrawer] = useState<{
    open: boolean;
    packet: PacketThinker[];
    chosenIds: string[];
  }>({ open: false, packet: [], chosenIds: [] });

  return (
    <>
      <AnswerCard
        question={response.question}
        response={response}
        shareUrl={shareUrl}
        onOpenSources={(packet, chosenIds) => setDrawer({ open: true, packet, chosenIds })}
      />
      <SourceDrawer
        open={drawer.open}
        packet={drawer.packet}
        chosenIds={drawer.chosenIds}
        onClose={() => setDrawer((current) => ({ ...current, open: false }))}
      />
    </>
  );
}
