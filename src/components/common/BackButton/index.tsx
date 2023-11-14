"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";

export const BackButton: React.FC = () => {
  const router = useRouter();
  const paths = useSelectedLayoutSegments();

  return paths.length ? (
    <Button variant={"outline"} size="icon" onClick={() => router.push("/painel")}>
      <ChevronLeft className="w-4 h-4" />
    </Button>
  ) : null;
};
