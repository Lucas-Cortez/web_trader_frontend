"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// import { Profile } from "@/entities/profile";
import { useTrade } from "@/hooks/useTrade";
import { MoreVertical, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";

type ChartMenuProps = { profileId: string };

export const ChartMenu: React.FC<ChartMenuProps> = ({ profileId }) => {
  const { deleteStockAnalysis } = useTrade();
  const { data } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"sm"}>
          <MoreVertical size={20} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 z-50">
        <DropdownMenuItem
          className="flex items-center cursor-pointer"
          onClick={() => {
            deleteStockAnalysis(profileId, data?.accessToken || "");
          }}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>excluir</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
