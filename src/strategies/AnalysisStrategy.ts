export type StrategyInput = { values: number[]; closingPrice: number };

export interface AnalysisStrategy {
  tag: string;
  setAndExecuteAnalysis(input: StrategyInput): void;
  itsTimeToBuy(): boolean;
  itsTimeToSell(): boolean;
}
