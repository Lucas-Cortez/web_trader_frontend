import { Candle } from "@/entities/candle";
import { BrokerService } from "../brokerService";
import fakeCandleData from "../../../fakeCandleData.json";
import { CandleAdapter } from "@/utils/candleAdapter";

export class MockBrokerService implements BrokerService {
  constructor(private readonly candleAdapter: CandleAdapter) {}

  async getCandleData(symbol: string, interval: string): Promise<Candle[]> {
    // const candleData: Candle[] = [
    //   {
    //     openTime: 1,
    //     closeTime: 1,
    //     openPrice: "1",
    //     highPrice: "1",
    //     lowPrice: "1",
    //     closePrice: "1",
    //   },
    //   {
    //     openTime: 1,
    //     closeTime: 1,
    //     openPrice: "1",
    //     highPrice: "1",
    //     lowPrice: "1",
    //     closePrice: "1",
    //   },
    // ];
    // return candleData;
    const candleData = fakeCandleData;
    await sleep(1000);
    return candleData.map((candle) => this.candleAdapter.convert(candle));
  }
}

const sleep = (delay: number) => new Promise((res) => setTimeout(res, delay));
