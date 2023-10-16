import { Candle } from "@/entities/candle";

export interface CandleAdapter<I = any> {
  convert(data: I): Candle;
}

export class BinanceCandleAdapter implements CandleAdapter<(string | number)[]> {
  convert(data: (string | number)[]): Candle {
    return {
      openTime: data[0] as number,
      closeTime: data[6] as number,
      openPrice: data[1] as string,
      highPrice: data[2] as string,
      lowPrice: data[3] as string,
      closePrice: data[4] as string,
    };
  }
}

export class BinanceCandleWebsocketAdapter implements CandleAdapter {
  convert(data: any): Candle {
    return {
      openTime: data.k.t,
      closeTime: data.k.T,
      openPrice: data.k.o,
      highPrice: data.k.h,
      lowPrice: data.k.l,
      closePrice: data.k.c,
    };
  }
}

export const binanceCandleWebsocketAdapter = new BinanceCandleWebsocketAdapter();
