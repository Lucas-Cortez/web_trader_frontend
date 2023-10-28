"use client";

import { brokerService, profileBotService } from "@/services";
import { useTradeStore } from "@/stores/useTradeStore";
import { binanceCandleWebsocketAdapter } from "@/utils/candleAdapter";
import { CandleListener } from "@/CandleListener";
import { getSession } from "next-auth/react";
import { useCallback, useState } from "react";
import { Profile } from "@/entities/profile";
import { strategiesOrchestrator } from "@/StrategiesOrchestrator";
import { useStrategyStore } from "@/stores/useStrategyStore";
import { useToast } from "@/components/ui/use-toast";
import { Trade } from "@/enums/trade";

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
  const strategies = useStrategyStore((state) => state.strategies);
  const { toast } = useToast();

  const getStrategiesTags = useCallback(
    (strategiesIds: string[]) => {
      const tags: string[] = [];

      strategiesIds.forEach((strategyId) => {
        const strategy = strategies.find((v) => v.id === strategyId);

        if (strategy) tags.push(strategy.tag);
      });

      return tags;
    },
    [strategies],
  );

  const processOrder = async (profileId: string, decision: Trade) => {
    const tradeProfile = useTradeStore.getState().tradeProfiles[profileId];

    const inPosition = tradeProfile.inPosition;

    if (inPosition && decision === Trade.SELL) {
      console.log("ORDEM DE VENDA");
      toast({ description: decision });
    }
    if (!inPosition && decision === Trade.BUY) {
      console.log("ORDEM DE COMPRA");
      toast({ description: decision });
    }
  };

  const generateCallback = useCallback(
    (profile: Profile) => (data: any) => {
      const candle = binanceCandleWebsocketAdapter.convert(data);

      if (!candle.closed) return;

      const candles = useTradeStore.getState().tradeProfiles[profile.id].data;

      updateLastData(profile.id, candle);

      candles.push(candle);

      const tags = getStrategiesTags(profile.strategiesIds);

      const decision = strategiesOrchestrator.analize(
        tags,
        candles.map((c) => Number(c.closePrice)),
      );

      // console.log({ tags, decision });

      if (!decision) return;

      processOrder(profile.id, decision);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getStrategiesTags, updateLastData],
  );

  const handleCandleData = useCallback(
    async (profile: Profile) => {
      const candleData = await brokerService.getCandleData(profile.symbol, profile.interval);

      const callback = generateCallback(profile);

      const listener = new CandleListener({ interval: profile.interval, symbol: profile.symbol }, callback);

      addCandleData(profile, candleData, listener);
    },
    [addCandleData, generateCallback],
  );

  const initializeTrades = useCallback(async () => {
    if (loaded) return;

    const session = await getSession();

    if (!session) return;

    const profiles = await profileBotService.get(session.accessToken);

    for (const profile of profiles) {
      try {
        await handleCandleData(profile);
      } catch (error) {
        console.log("[ERROR](initializeTrades): ", error);
      } finally {
        setLoaded(true);
      }
    }
  }, [handleCandleData, loaded]);

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

        await handleCandleData(profile);
      } catch (error) {
        console.log("[ERROR](addStockAnalysis): ", error);
      }
    },
    [handleCandleData],
  );

  const deleteStockAnalysis = async (profileId: string, accessToken: string) => {
    await profileBotService.delete(profileId, accessToken);
    removeCandleData(profileId);
  };

  const finishTrades = () => reset();

  return { addStockAnalysis, deleteStockAnalysis, initializeTrades, finishTrades };
};
