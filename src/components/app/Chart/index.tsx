"use client";

import { useTradeStore } from "@/stores/useTradeStore";

type ChartProps = {
  profileId: string;
  // data: Candle[];
  // name: string;
};

export const Chart: React.FC<ChartProps> = ({ profileId }) => {
  const chartData = useTradeStore((state) => state.tradeProfiles[profileId]);
  // console.log(data.length);

  return (
    <div className="bg-gray-200 w-full h-60 border border-gray-300 rounded-lg shadow-lg flex flex-col items-start p-3 gap-2">
      <h3 className="font-bold">{chartData.name}</h3>

      <div className="overflow-auto w-full bg-gray-400 shadow-inner shadow-gray-500 rounded-lg p-2">
        <pre className="text-xs">
          <code>{JSON.stringify(chartData.data, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
};
