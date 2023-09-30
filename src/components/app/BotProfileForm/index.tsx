"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckboxCardInput } from "../CheckboxCardInput";
import { useForm } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { handleWS } from "@/stores";

export const BotProfileForm: React.FC = () => {
  const { handleSubmit } = useForm();

  const onSubmit = handleSubmit((formData) => {
    console.log(formData);
    // handleWS();
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <div>
        <Label>
          Apelido{" "}
          <span className="text-xs text-gray-400">
            (Nome para melhor identificação do seu gráfico)
          </span>
        </Label>
        <Input />
      </div>

      <div className="flex gap-4">
        <div className="w-full">
          <Label>Símbolo</Label>

          <Select>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="btcbrl">BTCBRL</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full">
          <Label>Intervalo</Label>

          <Select>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="1m">1 minuto</SelectItem>
                <SelectItem value="5m">5 minutos</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Selecione as suas estratégias</Label>

        <ScrollArea className="h-40 pr-3">
          <div className="flex flex-col gap-2">
            <div>
              <CheckboxCardInput
                title="Bandas de Bollinger"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, officia."
                id="bb"
              />
            </div>

            <div>
              <Input type="checkbox" id="opa2" className="peer sr-only" />

              <Label
                htmlFor="opa2"
                className="peer-checked:[&>div]:border-black"
              >
                <div className="border rounded-md p-3 cursor-pointer">
                  <h3 className="font-medium text-sm mb-1">
                    Índice de Força Relativa
                  </h3>
                  <p className="text-xs text-gray-500 font-normal">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vitae, officia.
                  </p>
                </div>
              </Label>
            </div>
          </div>
        </ScrollArea>
      </div>

      <Button type="submit">Criar</Button>
    </form>
  );
};
