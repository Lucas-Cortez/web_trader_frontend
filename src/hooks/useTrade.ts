"use client";

import { getSession } from "next-auth/react";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

import { brokerService, orderService, profileBotService } from "@/services";
import { CandleListener } from "@/CandleListener";
import { strategiesOrchestrator } from "@/strategies/StrategiesOrchestrator";
import { binanceCandleWebsocketAdapter } from "@/utils/candleAdapter";
import { useTradeStore } from "@/stores/useTradeStore";
import { useStrategyStore } from "@/stores/useStrategyStore";

import { Trade } from "@/enums/trade";
import { Profile } from "@/entities/profile";
import { Candle } from "@/entities/candle";
import { useOrderStore } from "@/stores/useOrderStore";

type ProfileData = {
  name: string;
  interval: string;
  symbol: string;
  quantity: number;
  strategiesIds: string[];
  stopLoss: number;
  stopEnable: boolean;
  accessToken: string;
};

export const useTrade = () => {
  const [loaded, setLoaded] = useState<boolean>(false);

  const getStrategiesTags = (strategiesIds: string[]) => {
    const tags: string[] = [];

    const strategies = useStrategyStore.getState().strategies;

    strategiesIds.forEach((strategyId) => {
      const strategy = strategies.find((v) => v.id === strategyId);

      if (strategy) tags.push(strategy.tag);
    });

    return tags;
  };

  const processOrder = async (profile: Profile, tradeType: Trade, closingPrice: number) => {
    const session = await getSession();

    if (!session) return;

    console.log(`${profile.id}: ${tradeType} ORDER!!`);
    toast(`${profile.name}: ${tradeType === Trade.BUY ? "Compra" : "Venda"}`, { position: "bottom-right" });
    const opa = await orderService.createOrder(profile.id, { tradeType, closingPrice }, session.accessToken);
    runProfileRegister(profile.id);
  };

  const runProfileRegister = async (profileId: string) => {
    const session = await getSession();

    if (!session) return;

    const version = useTradeStore.getState().tradeProfiles[profileId].version;

    const data = await profileBotService.getProcessedProfile(profileId, version, session.accessToken);

    if (!data) return;

    const orders = await orderService.getProfileOrders(profileId, session.accessToken, {
      take: 1,
      skip: 0,
    });

    const lastOrder = orders[0];

    useTradeStore.getState().updateProfile(profileId, data);

    if (lastOrder) return;

    useTradeStore.getState().addProfileOrder(profileId, lastOrder);
    useOrderStore.getState().addOrder(lastOrder);
  };

  const takeDecision = (
    tags: string[],
    closingPriceCandles: number[],
    inPosition: boolean,
    stopEnable: boolean,
    stopLoss: number,
    lastOrderPrice?: number,
  ) => {
    if (stopEnable && inPosition) {
      const lastOrder = lastOrderPrice!;
      const closingPrice = closingPriceCandles[closingPriceCandles.length - 1];

      const minValue = lastOrder - lastOrder * (stopLoss * 0.01);

      if (minValue >= closingPrice) return Trade.SELL;
    }

    const decision = strategiesOrchestrator.analize(tags, closingPriceCandles);

    if (!decision) return null;

    if (inPosition && decision === Trade.SELL) return Trade.SELL;
    if (!inPosition && decision === Trade.BUY) return Trade.BUY;

    return null;
  };

  const handleCandleListener = useCallback((candle: Candle, profile: Profile) => {
    const {
      data: candles,
      inPosition,
      lastOrderClosingPrice,
      stopEnable,
    } = useTradeStore.getState().tradeProfiles[profile.id];

    useTradeStore.getState().updateLastData(profile.id, candle);

    candles.push(candle);

    const tags = getStrategiesTags(profile.strategiesIds);

    const tradeType = takeDecision(
      tags,
      candles.map((c) => Number(c.closePrice)),
      inPosition,
      stopEnable,
      profile.stopLoss,
      lastOrderClosingPrice,
    );

    if (!tradeType) return;

    processOrder(profile, tradeType, Number(candle.closePrice));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateCallback = useCallback(
    (profile: Profile) => (data: any) => {
      const candle = binanceCandleWebsocketAdapter.convert(data);

      if (!candle.closed) return;

      handleCandleListener(candle, profile);
    },
    [handleCandleListener],
  );

  const initializeChartData = useCallback(
    async (profile: Profile, accessToken: string) => {
      const candleData = await brokerService.getCandleData(profile.symbol, profile.interval);

      const callback = generateCallback(profile);

      const listener = new CandleListener({ interval: profile.interval, symbol: profile.symbol }, callback);

      const profileOrders = await orderService.getProfileOrders(profile.id, accessToken);

      useTradeStore.getState().addCandleData(profile, candleData, listener, profileOrders);
    },
    [generateCallback],
  );

  const initializeTrades = useCallback(async () => {
    if (loaded) return;

    setLoaded(false);

    const session = await getSession();

    if (!session) return;

    const profiles = await profileBotService.get(session.accessToken);

    for (const profile of profiles) {
      try {
        await initializeChartData(profile, session.accessToken);
      } catch (error) {
        console.log("[ERROR](initializeTrades): ", error);
      } finally {
        setLoaded(true);
      }
    }
  }, [initializeChartData, loaded]);

  const addStockAnalysis = useCallback(
    async (profileData: ProfileData) => {
      const { name, interval, symbol, quantity, strategiesIds, accessToken, stopEnable, stopLoss } =
        profileData;

      try {
        const profile = await profileBotService.create(
          {
            name,
            interval,
            symbol,
            quantity,
            strategiesIds,
            stopEnable,
            stopLoss,
          },
          accessToken,
        );

        await initializeChartData(profile, accessToken);
      } catch (error) {
        console.log("[ERROR](addStockAnalysis): ", error);
      }
    },
    [initializeChartData],
  );

  const deleteStockAnalysis = async (profileId: string, accessToken: string) => {
    await profileBotService.delete(profileId, accessToken);
    useTradeStore.getState().removeCandleData(profileId);
  };

  const finishTrades = () => useTradeStore.getState().reset();

  return { addStockAnalysis, deleteStockAnalysis, initializeTrades, finishTrades };
};
