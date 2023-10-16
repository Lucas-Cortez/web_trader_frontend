"use client";

import { brokerService, profileBotService } from "@/services";
import { useTradeStore } from "@/stores/useTradeStore";
import { binanceCandleWebsocketAdapter } from "@/utils/candleAdapter";
import { CandleListener } from "@/CandleListener";
import { getSession } from "next-auth/react";
import { useCallback, useState } from "react";

type ProfileData = {
  name: string;
  interval: string;
  symbol: string;
  quantity: number;
  strategiesIds: string[];
  accessToken: string;
};

export const useTrade = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const addCandleData = useTradeStore((state) => state.addCandleData);
  const removeCandleData = useTradeStore((state) => state.removeCandleData);
  const updateLastData = useTradeStore((state) => state.updateLastData);
  const reset = useTradeStore((state) => state.reset);

  const initializeTrades = useCallback(async () => {
    if (loaded) return;

    const session = await getSession();

    if (!session) return;

    const profiles = await profileBotService.get(session.accessToken);

    for (const profile of profiles) {
      try {
        const { interval, symbol } = profile;

        const candleData = await brokerService.getCandleData(symbol, interval);

        const callback = (data: any) => {
          const candle = binanceCandleWebsocketAdapter.convert(data);
          updateLastData(profile.id, candle);
        };

        addCandleData(profile.id, candleData, new CandleListener({ interval, symbol }, callback));
      } catch (error) {
        console.log("[ERROR](initializeTrades): ", error);
      } finally {
        setLoaded(true);
      }
    }
  }, [addCandleData, loaded, updateLastData]);

  const addStockAnalysis = useCallback(
    async (profileData: ProfileData) => {
      const { name, interval, symbol, quantity, strategiesIds, accessToken } = profileData;

      try {
        const profile = await profileBotService.create(
          name,
          interval,
          symbol,
          quantity,
          strategiesIds,
          accessToken,
        );

        const candleData = await brokerService.getCandleData(symbol, interval);

        const callback = (data: any) => {
          const candle = binanceCandleWebsocketAdapter.convert(data);
          updateLastData(profile.id, candle);
        };

        addCandleData(profile.id, candleData, new CandleListener({ interval, symbol }, callback));
      } catch (error) {
        console.log("[ERROR](addStockAnalysis): ", error);
      }
    },
    [addCandleData, updateLastData],
  );

  const deleteStockAnalysis = async (id: string) => removeCandleData(id);

  const finishTrades = () => reset();

  return { addStockAnalysis, deleteStockAnalysis, initializeTrades, finishTrades };
};
