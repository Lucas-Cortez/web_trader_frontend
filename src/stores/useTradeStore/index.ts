import { TradeStore } from "./types";
import { Candle } from "@/entities/candle";
import { createStoreWithMiddleware } from "../createStoreWithMiddleware";
import { CandleListener } from "@/CandleListener";
import { StateCreator } from "zustand";
import { Profile } from "@/entities/profile";

const tradeStore: StateCreator<TradeStore, [], []> = (set) => ({
  tradeProfiles: {},

  addCandleData: (profile: Profile, data: Candle[], listener: CandleListener) =>
    set((state) => ({
      tradeProfiles: { ...state.tradeProfiles, [profile.id]: { ...profile, data, listener } },
    })),

  removeCandleData: (id: string) =>
    set((state) => {
      state.tradeProfiles[id].listener.closeChannel();
      delete state.tradeProfiles[id];
      return { tradeProfiles: { ...state.tradeProfiles } };
    }),

  updateProfile: (id, profile) =>
    set((state) => {
      return { tradeProfiles: { ...state.tradeProfiles, [id]: { ...state.tradeProfiles[id], ...profile } } };
    }),

  updateLastData: (id: string, data: Candle) =>
    set((state) => {
      const profile = state.tradeProfiles[id];
      let newData = profile.data.slice(1);
      newData.push(data);

      return { tradeProfiles: { ...state.tradeProfiles, [id]: { ...profile, data: newData } } };
    }),

  reset: () =>
    set((state) => {
      Object.keys(state.tradeProfiles).forEach((v) => state.tradeProfiles[v].listener.closeChannel());
      return { tradeProfiles: {} };
    }),
});

export const useTradeStore = createStoreWithMiddleware(tradeStore);
