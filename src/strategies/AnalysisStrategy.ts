export type StrategyInput = { values: number[]; closingPrice: number };
export type StrategyOutput = { buy: boolean; sell: boolean };

export abstract class AnalysisStrategy {
  abstract tag: string;

  abstract executeAnalysis(input: StrategyInput): StrategyOutput;
  protected abstract sell(...input: any[]): boolean;
  protected abstract buy(...input: any[]): boolean;
}
