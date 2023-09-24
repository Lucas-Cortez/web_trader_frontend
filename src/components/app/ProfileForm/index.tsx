"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

export const ProfileForm: React.FC = () => {
  return (
    <form className="flex flex-col gap-4">
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
        <Label>Estratégias</Label>

        <div className="flex flex-col gap-2">
          <div>
            <Input type="checkbox" id="opa" className="peer sr-only" />

            <Label htmlFor="opa" className="peer-checked:[&>div]:border-black">
              <div className="border rounded-md p-3 cursor-pointer">
                <h3 className="font-medium text-sm mb-1">
                  Bandas de Bollinger
                </h3>
                <p className="text-xs text-gray-500 font-normal">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Vitae, officia.
                </p>
              </div>
            </Label>
          </div>

          <div>
            <Input type="checkbox" id="opa2" className="peer sr-only" />

            <Label htmlFor="opa2" className="peer-checked:[&>div]:border-black">
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
      </div>

      <Button type="submit">Criar</Button>
    </form>
  );
};
