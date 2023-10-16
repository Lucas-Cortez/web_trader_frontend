"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BotProfileForm } from "../BotProfileForm";
import { useState } from "react";

export const CreateAnalysisModal: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
      <DialogTrigger asChild>
        <Button>Criar análise</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criando perfil para análise do robô</DialogTitle>
          <DialogDescription>
            Configure as opções necessárias para que o robô funcione de acordo com as suas escolhas de análise
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <BotProfileForm onSubmitAction={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
