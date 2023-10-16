import { BollingerBands } from "technicalindicators";
import { AnalysisStrategy, StrategyInput } from "../AnalysisStrategy";

const PERIOD = 20;

export class BollingerBandsStrategy implements AnalysisStrategy {
  public tag = "bollinger_bands";
  private closingPrice?: number;
  private lastBB?: { upper: number; lower: number };

  setAndExecuteAnalysis(input: StrategyInput): void {
    this.closingPrice = input.closingPrice;

    const data = BollingerBands.calculate({
      period: PERIOD,
      values: input.values,
      stdDev: 2,
    });

    const last = data[data.length - 2];

    this.lastBB = { lower: last.lower, upper: last.upper };
  }

  itsTimeToBuy(): boolean {
    if (!this.lastBB || !this.closingPrice)
      throw new Error("missing_analysis_data", { cause: "[BollingerBandsStrategy]: itsTimeToBuy" });

    const decision = this.closingPrice < this.lastBB.upper;

    return decision;
  }

  itsTimeToSell(): boolean {
    if (!this.lastBB || !this.closingPrice)
      throw new Error("missing_analysis_data", { cause: "[BollingerBandsStrategy]: itsTimeToSell" });

    const decision = this.closingPrice > this.lastBB.lower;

    return decision;
  }
}
