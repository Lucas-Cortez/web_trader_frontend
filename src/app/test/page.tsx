"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

// import { useTrade } from "@/hooks/useTrade";
// import { useTradeStore } from "@/stores/useTradeStore";
// import { CandleListener } from "@/CandleListener";
// import { useEffect, useRef, useState } from "react";
// import data from "./data.json";

export default function TestPage() {
  return (
    <div>
      {/* <DataChart /> */}

      <Input type="text" />
      <Checkbox
        defaultChecked={true}
        checked={false}
        // onCheckedChange={(v) => {
        //   console.log("event:", v);
        // }}
        // onChange={(e) => {
        //   console.log("event:", e.currentTarget);
        // }}
      />
    </div>
  );
}
// type chart = { x: Date; y: string[] | string }[];

// function convertToChartData() {
//   const times: Date[] = [];

//   const dataChart: chart = data.data.slice(data.data.length - 100, data.data.length).map((cand) => {
//     times.push(new Date(cand.openTime));
//     return {
//       x: new Date(cand.openTime),
//       y: [cand.openPrice, cand.highPrice, cand.lowPrice, cand.closePrice],
//     };
//   });

//   const upperChart: chart = [];
//   const lowerChart: chart = [];

//   data.analysis.slice(data.analysis.length - 100, data.analysis.length).forEach((el, i) => {
//     upperChart.push({ x: times[i], y: String(el.upper) });
//     lowerChart.push({ x: times[i], y: String(el.lower) });
//   });

//   return { dataChart, upperChart, lowerChart };
// }

// const { dataChart, lowerChart, upperChart } = convertToChartData();

// import ReactApexChart, { Props } from "react-apexcharts";

// const opa: Props = {
//   series: [
//     {
//       type: "line",
//       name: "upper",
//       data: upperChart,
//       color: "#3967ff",
//     },
//     {
//       type: "line",
//       name: "lower",
//       data: lowerChart,
//       color: "#3967ff",
//     },
//     {
//       name: "btcbrl",
//       type: "candlestick",
//       data: dataChart,
//     },
//   ],
//   options: {
//     chart: {
//       // type: "line",
//     },
//     title: {
//       text: "Product Trends by Month",
//       align: "left",
//     },
//     xaxis: {
//       type: "datetime",
//     },
//   },
// };

// export const DataChart: React.FC = () => {
//   return (
//     <div id="chart" className="w-full h-96 bg-gray-100 py-1 rounded-md text">
//       <ReactApexChart options={opa.options} series={opa.series} type="candlestick" height={"100%"} />
//     </div>
//   );
// };
