"use client";

import { useTrade } from "@/hooks/useTrade";
import { orderService, strategyService } from "@/services";
import { useOrderStore } from "@/stores/useOrderStore";
import { useStrategyStore } from "@/stores/useStrategyStore";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";

export const InitializeChartsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { initializeTrades } = useTrade();
  const setStrategies = useStrategyStore((state) => state.setStrategies);
  const loaded = useStrategyStore((state) => state.loaded);
  const setOrders = useOrderStore((state) => state.setOrders);
  const { data } = useSession();

  useEffect(() => {
    if (data?.accessToken)
      (async () => {
        const strategies = await strategyService.getStrategies();
        setStrategies(strategies);

        const orders = await orderService.getUserOrders(data?.accessToken || "");
        setOrders(orders);
      })();

    // return () => finishTrades();
  }, [data?.accessToken, setOrders, setStrategies]);

  useEffect(() => {
    if (loaded) initializeTrades();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  return children;
};
