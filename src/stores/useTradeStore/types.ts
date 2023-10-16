import { Candle } from "@/entities/candle";
import { CandleListener } from "@/CandleListener";

type TradeState = { tradeCandles: Record<string, { data: Candle[]; listener: CandleListener }> };

type TradeActions = {
  addCandleData: (id: string, data: Candle[], listener: CandleListener) => void;
  removeCandleData: (id: string) => void;
  updateLastData: (id: string, data: Candle) => void;
  reset: () => void;
};

export type TradeStore = TradeState & TradeActions;
