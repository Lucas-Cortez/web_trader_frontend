import { RSI } from "technicalindicators";
import { AnalysisStrategy, StrategyInput, StrategyOutput } from "../AnalysisStrategy";

const PERIOD = 14;
const OVERBOUGHT = 70;
const OVERSOLD = 30;

export class RsiStrategy extends AnalysisStrategy {
  public tag = "relative_strength_index";

  executeAnalysis(input: StrategyInput): StrategyOutput {
    const data = RSI.calculate({ values: input.values, period: PERIOD });
    const lastRsi = data[data.length - 1];

    const decision = { buy: this.buy(lastRsi), sell: this.buy(lastRsi) };

    return decision;
  }

  protected buy(lastRsi: number): boolean {
    return lastRsi < OVERSOLD;
  }

  protected sell(lastRsi: number): boolean {
    return lastRsi > OVERBOUGHT;
  }
}
