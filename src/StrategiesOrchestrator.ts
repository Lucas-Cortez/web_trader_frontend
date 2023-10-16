import { Profile } from "./entities/profile";
import { AnalysisStrategy } from "./strategies/AnalysisStrategy";
import { BollingerBandsStrategy } from "./strategies/implementation/BollingerBandsStrategy";
import { RsiStrategy } from "./strategies/implementation/RsiStrategy";

const bollingerBandsStrategy = new BollingerBandsStrategy();
const rsiStrategy = new RsiStrategy();

function selectStrategy(tag: string): AnalysisStrategy {
  const strategies = {
    [bollingerBandsStrategy.tag]: bollingerBandsStrategy,
    [rsiStrategy.tag]: rsiStrategy,
  };

  if (!strategies[tag]) throw new Error("strategy does not exist");

  return strategies[tag];
}

enum Trade {
  BUY = "buy",
  SELL = "sell",
}

export class StrategiesOrchestrator {
  analize(profile: Profile, data: number[]) {
    const buy: boolean[] = [];
    const sell: boolean[] = [];

    profile.strategiesIds.forEach((v) => {
      const strategy = selectStrategy(v);
      strategy.setAndExecuteAnalysis({ values: data, closingPrice: data[data.length - 1] });

      buy.push(strategy.itsTimeToBuy());
      sell.push(strategy.itsTimeToSell());
    });

    if (buy.every((v) => v)) return Trade.BUY;
    if (sell.every((v) => v)) return Trade.SELL;

    return null;
  }
}
