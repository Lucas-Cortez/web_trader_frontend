"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { ArrowRightIcon } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
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

export const CreateAnalysisModal: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { data } = useSession();
  const { toast } = useToast();

  const verifyIfCanOpen = (v: boolean) => {
    if (!!data?.user.hasKey) setOpen(v);
    else
      toast({
        description: "É necessário registrar uma chave de API para utilizar este recurso",
        variant: "destructive",
        action: (
          <ToastAction altText="registry" onClick={() => router.push("/painel/perfil")}>
            <div className="flex items-center">
              Registrar <ArrowRightIcon size={16} className="ml-2" />
            </div>
          </ToastAction>
        ),
      });
  };

  return (
    <Dialog open={open} onOpenChange={verifyIfCanOpen}>
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
