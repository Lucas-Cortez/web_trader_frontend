import { Candle } from "@/entities/candle";
import { CandleListener } from "@/CandleListener";
import { Strategy } from "@/entities/strategy";

type StrategyState = {
  strategies: Strategy[];
  loaded: boolean;
};

type StrategyActions = {
  setStrategies: (strategies: Strategy[]) => void;
};

export type StrategyStore = StrategyState & StrategyActions;
