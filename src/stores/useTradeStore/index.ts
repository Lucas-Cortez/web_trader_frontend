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

  updateLastData: (id: string, data: Candle) =>
    set((state) => {
      const newProfile = state.tradeProfiles[id];
      newProfile.data = newProfile.data.slice(1);
      newProfile.data.push(data);

      return { tradeProfiles: { ...state.tradeProfiles, [id]: newProfile } };
    }),

  reset: () =>
    set((state) => {
      Object.keys(state.tradeProfiles).forEach((v) => state.tradeProfiles[v].listener.closeChannel());
      return { tradeProfiles: {} };
    }),
});

export const useTradeStore = createStoreWithMiddleware(tradeStore);
