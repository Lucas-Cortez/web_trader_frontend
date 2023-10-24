import { Strategy } from "@/entities/strategy";
import { createStoreWithMiddleware } from "../createStoreWithMiddleware";
import { StrategyStore } from "./types";
import { StateCreator } from "zustand";

const strategyStore: StateCreator<StrategyStore, [], []> = (set) => ({
  loaded: false,
  strategies: [],
  setStrategies: (strategies: Strategy[]) =>
    set(() => {
      return { strategies, loaded: true };
    }),
});

export const useStrategyStore = createStoreWithMiddleware(strategyStore);
