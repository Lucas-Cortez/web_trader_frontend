import { Candle } from "@/entities/candle";
import { Props } from "react-apexcharts";

export function convertToChartData(candle: Candle[]): Props["series"] {
  return [
    {
      data: candle.slice(candle.length - 100, candle.length).map((cand) => {
        return {
          x: new Date(cand.openTime),
          y: [cand.openPrice, cand.highPrice, cand.lowPrice, cand.closePrice],
        };
      }),
    },
  ];
}
