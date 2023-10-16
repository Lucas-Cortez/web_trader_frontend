"use client";

import { useTrade } from "@/hooks/useTrade";
import { useTradeStore } from "@/stores/useTradeStore";
import { CandleListener } from "@/CandleListener";
import { useEffect } from "react";

export default function TestPage() {
  const { addStockAnalysis } = useTrade();

  return (
    <div>
      <button
        onClick={() => {
          // addStockAnalysis("btcbrl", "1s");
        }}
      >
        click
      </button>
    </div>
  );
}
