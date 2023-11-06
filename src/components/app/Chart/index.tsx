"use client";

import { useTradeStore } from "@/stores/useTradeStore";
import { ChartMenu } from "../ChartMenu";
import { useState } from "react";
import { DataChart } from "../DataChart";

type ChartProps = {
  profileId: string;
};

export const Chart: React.FC<ChartProps> = ({ profileId }) => {
  const profileName = useTradeStore((state) => state.tradeProfiles[profileId].name);
  // const { data, listener, ...profile } = useTradeStore((state) => state.tradeProfiles[profileId]);

  return (
    <div className="bg-gray-200 w-full h-60 border border-gray-300 rounded-lg shadow-lg flex flex-col items-start p-2 gap-2">
      <div className="flex justify-between w-full items-center">
        <h3 className="font-bold pl-2">{profileName}</h3>
        <ChartMenu profileId={profileId} />
      </div>

      <DataChart profileId={profileId} />

      {/* <div className="overflow-auto w-full bg-gray-400 shadow-inner shadow-gray-500 rounded-lg p-2">
        <pre className="text-xs">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </div> */}
    </div>
  );
};
