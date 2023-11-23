"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { Props } from "react-apexcharts";

import { useTradeStore } from "@/stores/useTradeStore";
import { convertToChartData } from "@/utils/helpers/convertToChartData";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const formatDate = (timestamp: number) => {
  const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  const date = new Date(timestamp);

  const minutes = date.getMinutes();

  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} ${date.getHours()}:${
    (minutes < 10 ? "0" : "") + minutes
  }`;
};

const OPTIONS: Props["options"] = {
  chart: {
    type: "candlestick",
    toolbar: {
      tools: {
        download: false,
        pan: '<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWhhbmQiPjxwYXRoIGQ9Ik0xOCAxMVY2YTIgMiAwIDAgMC0yLTJ2MGEyIDIgMCAwIDAtMiAydjAiLz48cGF0aCBkPSJNMTQgMTBWNGEyIDIgMCAwIDAtMi0ydjBhMiAyIDAgMCAwLTIgMnYyIi8+PHBhdGggZD0iTTEwIDEwLjVWNmEyIDIgMCAwIDAtMi0ydjBhMiAyIDAgMCAwLTIgMnY4Ii8+PHBhdGggZD0iTTE4IDhhMiAyIDAgMSAxIDQgMHY2YTggOCAwIDAgMS04IDhoLTJjLTIuOCAwLTQuNS0uODYtNS45OS0yLjM0bC0zLjYtMy42YTIgMiAwIDAgMSAyLjgzLTIuODJMNyAxNSIvPjwvc3ZnPg==" class="ico-download" width="20">',
        zoom: '<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNjYW4tc2VhcmNoIj48cGF0aCBkPSJNMyA3VjVhMiAyIDAgMCAxIDItMmgyIi8+PHBhdGggZD0iTTE3IDNoMmEyIDIgMCAwIDEgMiAydjIiLz48cGF0aCBkPSJNMjEgMTd2MmEyIDIgMCAwIDEtMiAyaC0yIi8+PHBhdGggZD0iTTcgMjFINWEyIDIgMCAwIDEtMi0ydi0yIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMyIvPjxwYXRoIGQ9Im0xNiAxNi0xLjktMS45Ii8+PC9zdmc+" width="20">',
        reset:
          '<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXJvdGF0ZS1jY3ciPjxwYXRoIGQ9Ik0zIDEyYTkgOSAwIDEgMCA5LTkgOS43NSA5Ljc1IDAgMCAwLTYuNzQgMi43NEwzIDgiLz48cGF0aCBkPSJNMyAzdjVoNSIvPjwvc3ZnPg==" class="ico-download" width="20">',
        zoomin:
          '<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXpvb20taW4iPjxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjgiLz48bGluZSB4MT0iMjEiIHgyPSIxNi42NSIgeTE9IjIxIiB5Mj0iMTYuNjUiLz48bGluZSB4MT0iMTEiIHgyPSIxMSIgeTE9IjgiIHkyPSIxNCIvPjxsaW5lIHgxPSI4IiB4Mj0iMTQiIHkxPSIxMSIgeTI9IjExIi8+PC9zdmc+" class="ico-download" width="20">',
        zoomout:
          '<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXpvb20tb3V0Ij48Y2lyY2xlIGN4PSIxMSIgY3k9IjExIiByPSI4Ii8+PGxpbmUgeDE9IjIxIiB4Mj0iMTYuNjUiIHkxPSIyMSIgeTI9IjE2LjY1Ii8+PGxpbmUgeDE9IjgiIHgyPSIxNCIgeTE9IjExIiB5Mj0iMTEiLz48L3N2Zz4=" class="ico-download" width="20">',
      },
    },
  },
  // title: { text: "btc-1m-BB", align: "left" },
  tooltip: {
    fixed: { enabled: true, position: "topLeft", offsetX: 4 },
    custom(options) {
      const [openPrice, highPrice, lowPrice, closePrice]: string[] = (
        options.w.config.series[0].data[options.dataPointIndex].y as string[]
      ).map((v) => Number(v).toFixed(2));

      return `
        <p class="text-xs bg-gray-100">
          O:${openPrice} H:${highPrice} L:${lowPrice} C:${closePrice}
        <p/>
      `;
    },
  },
  xaxis: {
    type: "datetime",
    tooltip: {
      formatter(value) {
        const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
        const date = new Date(value);

        const minutes = date.getMinutes();

        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} ${date.getHours()}:${
          (minutes < 10 ? "0" : "") + minutes
        }`;
      },
    },
    labels: {
      format: "HH:mm",
      datetimeUTC: false,
    },
  },
  yaxis: {
    tooltip: {
      enabled: true,
    },
  },
  // annotations: {
  //   xaxis: [
  //     {
  //       x: new Date(1699645740000).getTime(),
  //       borderColor: "#2761ff",
  //       label: {
  //         borderColor: "#2761ff",
  //         style: {
  //           fontSize: "12px",
  //           color: "#fff",
  //           background: "#2761ff",
  //         },
  //         orientation: "horizontal",
  //         offsetY: 7,
  //         text: "Buy",
  //       },
  //     },
  //     {
  //       x: new Date(1699648080000).getTime(),
  //       borderColor: "#ffbd67",
  //       label: {
  //         borderColor: "#ffbd67",
  //         style: {
  //           fontSize: "12px",
  //           color: "#fff",
  //           background: "#ffbd67",
  //         },
  //         orientation: "horizontal",
  //         offsetY: 7,
  //         text: "Sell",
  //       },
  //     },
  //   ],
  // },
};

type DataChartProps = {
  profileId: string;
};

export const DataChart: React.FC<DataChartProps> = ({ profileId }) => {
  const data = useTradeStore((state) => state.tradeProfiles[profileId].data);

  const [options, setOptions] = useState<Props["options"]>(OPTIONS);

  const series: Props["series"] = [{ data: convertToChartData(data) }];

  return (
    <div id="chart" className="w-full h-full bg-gray-100 py-1 rounded-md text">
      <ReactApexChart options={options} series={series} type="candlestick" height={"100%"} />
    </div>
  );
};
