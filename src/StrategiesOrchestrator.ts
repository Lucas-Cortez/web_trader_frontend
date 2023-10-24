import { Profile } from "./entities/profile";
import { Trade } from "./enums/trade";
import { AnalysisStrategy } from "./strategies/AnalysisStrategy";
import { BollingerBandsStrategy } from "./strategies/implementation/BollingerBandsStrategy";
import { RsiStrategy } from "./strategies/implementation/RsiStrategy";

export class StrategiesOrchestrator {
  private readonly strategies: Record<string, AnalysisStrategy>;

  constructor(strategies: AnalysisStrategy[]) {
    this.strategies = Object.fromEntries(strategies.map((v) => [v.tag, v]));
  }

  private selectStrategy(tag: string): AnalysisStrategy {
    if (!this.strategies[tag]) throw new Error("strategy does not exist");

    return this.strategies[tag];
  }

  analize(strategiesTags: string[], data: number[]) {
    const buyValues: boolean[] = [];
    const sellValues: boolean[] = [];

    strategiesTags.forEach((v) => {
      const strategy = this.selectStrategy(v);
      const { buy, sell } = strategy.executeAnalysis({ values: data, closingPrice: data[data.length - 1] });

      console.log({ buy, sell });

      buyValues.push(buy);
      sellValues.push(sell);
    });

    console.log({ buyValues, sellValues });

    if (buyValues.every((v) => v)) return Trade.BUY;
    if (sellValues.every((v) => v)) return Trade.SELL;

    return null;
  }
}

export const strategiesOrchestrator = new StrategiesOrchestrator([
  new BollingerBandsStrategy(),
  new RsiStrategy(),
]);
