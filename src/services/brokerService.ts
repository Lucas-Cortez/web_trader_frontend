import { Candle } from "@/entities/candle";

export interface BrokerService {
  getCandleData(symbol: string, interval: string): Promise<Candle[]>;
}
