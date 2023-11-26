import { Candle } from "@/entities/candle";
import { BrokerService } from "../brokerService";
import { CandleAdapter } from "@/utils/candleAdapter";

export class BinanceBrokerService implements BrokerService {
  // private readonly url = `${process.env.NEXT_PUBLIC_BROKER_API_URL}/api/v3`;

  constructor(private readonly candleAdapter: CandleAdapter) {}

  async getCandleData(symbol: string, interval: string): Promise<Candle[]> {
    const params = new URLSearchParams({ symbol: symbol.toUpperCase(), interval, limit: "1000" });

    const response = await fetch(`/api/broker?${params.toString()}`);

    const data = (await response.json()) as any[];

    return data.map((candle) => this.candleAdapter.convert(candle));
  }
}
