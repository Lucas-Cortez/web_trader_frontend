import { RSI } from "technicalindicators";
import { AnalysisStrategy, StrategyInput } from "../AnalysisStrategy";

const PERIOD = 14;
const OVERBOUGHT = 70;
const OVERSOLD = 30;

export class RsiStrategy implements AnalysisStrategy {
  public tag = "relative_strength_index";
  private lastRsi?: number;

  setAndExecuteAnalysis(input: StrategyInput): void {
    const data = RSI.calculate({ values: input.values, period: PERIOD });
    this.lastRsi = data[data.length - 1];
  }

  itsTimeToBuy(): boolean {
    if (!this.lastRsi) throw new Error("missing_analysis_data", { cause: "[RsiStrategy]: itsTimeToBuy" });

    return this.lastRsi < OVERSOLD;
  }

  itsTimeToSell(): boolean {
    if (!this.lastRsi) throw new Error("missing_analysis_data", { cause: "[RsiStrategy]: itsTimeToSell" });

    return this.lastRsi > OVERBOUGHT;
  }
}
