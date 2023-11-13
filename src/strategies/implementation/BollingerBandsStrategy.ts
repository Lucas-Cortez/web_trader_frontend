import { BollingerBands } from "technicalindicators";
import { AnalysisStrategy, StrategyInput, StrategyOutput } from "../AnalysisStrategy";

const PERIOD = 20;

export class BollingerBandsStrategy extends AnalysisStrategy {
  public tag = "bollinger_bands";

  executeAnalysis(input: StrategyInput): StrategyOutput {
    const data = BollingerBands.calculate({
      period: PERIOD,
      values: input.values,
      stdDev: 2,
    });

    console.log({ data });

    const last = data[data.length - 2];

    const closingPrice = input.closingPrice;

    const upper = last.upper;
    const lower = last.lower;

    const decision = { buy: this.buy(closingPrice, lower), sell: this.sell(closingPrice, upper) };

    return decision;
  }

  protected buy(closingPrice: number, lastBBLower: number): boolean {
    return closingPrice < lastBBLower;
  }

  protected sell(closingPrice: number, lastBBUpper: number): boolean {
    return closingPrice > lastBBUpper;
  }
}
