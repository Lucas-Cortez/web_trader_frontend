import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BellRing } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const StopsForm: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"}>
          <BellRing size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Configuração dos Paradas (Stops)</DialogTitle>
          <DialogDescription>
            Configure os gatilhos para quando os robôs devem parar as operações
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="flex flex-col gap-4">
            <div>
              <Label>Parar ganho (Stop gain)</Label>
              <Input type="number" min={0} />
            </div>

            <div>
              <Label>Parar perda (Stop loss)</Label>
              <Input type="number" min={0} />
            </div>

            <div className="flex items-center gap-2">
              <Switch />
              <Label>Ativado</Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="submit">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
