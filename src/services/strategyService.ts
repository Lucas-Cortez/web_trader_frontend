import { Strategy } from "@/entities/strategy";

export interface StrategyService {
  getStrategies(): Promise<Strategy[]>;
}
