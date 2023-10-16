import { TradeStore } from "./types";
import { Candle } from "@/entities/candle";
import { createStoreWithMiddleware } from "../createStoreWithMiddleware";
import { CandleListener } from "@/CandleListener";

export const useTradeStore = createStoreWithMiddleware<TradeStore>((set) => ({
  tradeCandles: {},

  addCandleData: (id: string, data: Candle[], listener: CandleListener) =>
    set((state) => ({ tradeCandles: { ...state.tradeCandles, [id]: { data, listener } } })),

  removeCandleData: (id: string) =>
    set((state) => {
      state.tradeCandles[id].listener.closeChannel();
      delete state.tradeCandles[id];
      return { tradeCandles: { ...state.tradeCandles } };
    }),

  updateLastData: (id: string, data: Candle) =>
    set((state) => {
      state.tradeCandles[id].data.shift();
      state.tradeCandles[id].data.push(data);
      return { tradeCandles: state.tradeCandles };
    }),

  reset: () =>
    set((state) => {
      Object.keys(state.tradeCandles).forEach((v) => state.tradeCandles[v].listener.closeChannel());
      return { tradeCandles: {} };
    }),
}));
