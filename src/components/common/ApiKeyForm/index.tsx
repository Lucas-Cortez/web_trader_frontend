"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { apiKeyService } from "@/services";
import { useTradeStore } from "@/stores/useTradeStore";
import { ArrowRightIcon, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";

export const ApiKeyForm: React.FC = () => {
  const [key, setKey] = useState<string>("");
  const [secret, setSecret] = useState<string>("");
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  const tradeCandlesIds = useTradeStore(useShallow((state) => Object.keys(state.tradeProfiles)));

  const { data, update } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  if (!data) return null;

  const handleSave = async () => {
    if (!key) return;
    setLoadingSave((prev) => !prev);
    try {
      await apiKeyService.create({ key, secret }, data.accessToken);
      await update({ hasKey: true });
      setSecret("");
      setKey("");
    } catch (error) {
      toast({ description: "Chaves inválidas", variant: "destructive" });
    } finally {
      setLoadingSave((prev) => !prev);
    }
  };

  const handleDelete = async () => {
    if (!!tradeCandlesIds.length)
      return toast({
        description: "É necessário que nenhum robô esteja utilizando esta chave",
        variant: "destructive",
        action: (
          <ToastAction altText="registry" onClick={() => router.push("/painel")}>
            <div className="flex items-center">
              Painel <ArrowRightIcon size={16} className="ml-2" />
            </div>
          </ToastAction>
        ),
      });

    setLoadingDelete((prev) => !prev);
    await apiKeyService.delete(data.accessToken);
    await update({ hasKey: false });
    setLoadingDelete((prev) => !prev);
  };

  return (
    <form className="flex flex-col items-center gap-4 backdrop-blur-sm shadow-lg p-3 rounded-lg w-full">
      <div className="flex flex-col self-start w-full sm:w-3/5">
        <p className="text-lg text-black mb-4 border-b border-b-black font-semibold">Gerenciamento de API</p>

        <div className="flex flex-col gap-2">
          <div>
            <Label htmlFor="key">Chave de API</Label>
            <Input
              type="password"
              id="key"
              readOnly={data.user.hasKey}
              value={data.user.hasKey ? "**********************************" : key}
              onChange={(event) => setKey(event.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="secret">Chave segredo</Label>
            <Input
              type="password"
              id="secret"
              readOnly={data.user.hasKey}
              value={data.user.hasKey ? "**********************************" : secret}
              onChange={(event) => setSecret(event.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 self-end">
        <Button
          className="w-20"
          type={"button"}
          disabled={!data.user.hasKey || loadingDelete}
          onClick={handleDelete}
        >
          {loadingDelete ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Excluir"}
        </Button>

        <Button
          className="w-20"
          type={"button"}
          disabled={data.user.hasKey || loadingSave}
          onClick={handleSave}
        >
          {loadingSave ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Salvar"}
        </Button>
      </div>
    </form>
  );
};
