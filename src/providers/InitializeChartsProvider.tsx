"use client";

import { useTrade } from "@/hooks/useTrade";
import { strategyService } from "@/services";
import { useStrategyStore } from "@/stores/useStrategyStore";
import { ReactNode, useEffect } from "react";

export const InitializeChartsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { initializeTrades } = useTrade();
  const setStrategies = useStrategyStore((state) => state.setStrategies);
  const loaded = useStrategyStore((state) => state.loaded);

  useEffect(() => {
    (async () => {
      const response = await strategyService.getStrategies();

      setStrategies(response);
    })();

    // return () => finishTrades();
  }, [setStrategies]);

  useEffect(() => {
    if (loaded) initializeTrades();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  return children;
};
