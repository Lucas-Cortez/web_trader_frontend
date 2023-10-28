"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Profile } from "@/entities/profile";
import { useTrade } from "@/hooks/useTrade";
import { useTradeStore } from "@/stores/useTradeStore";
import { MoreVertical, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";

type ChartProps = {
  profileId: string;
};

export const Chart: React.FC<ChartProps> = ({ profileId }) => {
  const { data, listener, ...profile } = useTradeStore((state) => state.tradeProfiles[profileId]);
  // const chartData = useTradeStore((state) => state.tradeProfiles[profileId]);
  // const { data, listener, ...profile } = chartData;

  return (
    <div className="bg-gray-200 w-full h-60 border border-gray-300 rounded-lg shadow-lg flex flex-col items-start p-3 gap-2">
      <div className="flex justify-between w-full">
        <h3 className="font-bold">{profile.name}</h3>
        <ChartMenu profile={profile} />
      </div>

      <div className="overflow-auto w-full bg-gray-400 shadow-inner shadow-gray-500 rounded-lg p-2">
        <pre className="text-xs">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
};

type ChartMenuProps = { profile: Profile };

export const ChartMenu: React.FC<ChartMenuProps> = ({ profile }) => {
  const { deleteStockAnalysis } = useTrade();
  const { data } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <MoreVertical size={20} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 z-50">
        <DropdownMenuItem
          className="flex items-center cursor-pointer"
          onClick={() => {
            deleteStockAnalysis(profile.id, data?.accessToken || "");
          }}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>excluir</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
