"use client";

import { useTradeStore } from "@/stores/useTradeStore";
import { Chart } from "../Chart";

export const ChartsSection: React.FC = () => {
  const tradeCandlesIds = useTradeStore((state) => Object.keys(state.tradeCandles));

  return (
    <section className="flex flex-col gap-5">
      {tradeCandlesIds.map((id) => (
        <Chart key={id} profileId={id} />
      ))}
    </section>
  );
};
