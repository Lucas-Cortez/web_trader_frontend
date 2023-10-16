"use client";

import { useTradeStore } from "@/stores/useTradeStore";

type ChartProps = {
  profileId: string;
};

export const Chart: React.FC<ChartProps> = ({ profileId }) => {
  // const chartData = useTradeStore((state) => state.tradeCandles);
  const chartData = useTradeStore((state) => state.tradeCandles[profileId].data);
  // console.log(profileId);

  return (
    <div className="bg-gray-200 w-full h-60 border border-gray-300 rounded-lg shadow-lg flex justify-center items-center">
      <pre className="h-[90%] w-[98%] bg-gray-400 shadow-inner shadow-gray-500 rounded-lg overflow-auto p-2 text-xs">
        <code>{JSON.stringify(chartData, null, 2)}</code>
        {/* <code>{JSON.stringify(chartData[profileId].data, null, 2)}</code> */}
      </pre>
    </div>
  );
};
