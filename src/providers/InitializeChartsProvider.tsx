"use client";

import { useTrade } from "@/hooks/useTrade";
import { ReactNode, useEffect } from "react";

export const InitializeChartsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { initializeTrades, finishTrades } = useTrade();

  useEffect(() => {
    initializeTrades();
    // return () => finishTrades();
  }, [finishTrades, initializeTrades]);

  return children;
};
