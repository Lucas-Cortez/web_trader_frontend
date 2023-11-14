"use client";

import { useTradeStore } from "@/stores/useTradeStore";
import { Chart } from "../Chart";
import { useShallow } from "zustand/react/shallow";

export const ChartsSection: React.FC = () => {
  // const tradeCandlesIds = useTradeStore(useShallow((state) => Object.keys(state.tradeCandles)));
  const tradeCandlesIds = useTradeStore((state) => Object.keys(state.tradeProfiles));
  // const tradeCandles = useTradeStore((state) => state.tradeCandles);

  return (
    <section className="flex flex-col gap-5">
      {tradeCandlesIds.map((id) => (
        <Chart key={id} profileId={id} />
      ))}

      {/* {tradeCandlesIds.map((id) => (
        <Chart key={id} profileId={id} data={tradeCandles[id].data} name={tradeCandles[id].name} />
      ))} */}
    </section>
  );
};
