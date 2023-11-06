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
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSession } from "next-auth/react";
import { useTrade } from "@/hooks/useTrade";
import { Loader2 } from "lucide-react";
import { useStrategyStore } from "@/stores/useStrategyStore";
import { Switch } from "@/components/ui/switch";
// import { useStrategy } from "@/hooks/useStrategy";

const createBotProfileSchema = z
  .object({
    name: z.string().min(1),
    interval: z.string(),
    symbol: z.string(),
    quantity: z.coerce.number().positive(),
    // strategiesIds: z.array(z.string().nonempty("must be an id")).nonempty("must contain strategies ids"),
    strategies: z
      .array(
        z.object({
          checked: z.boolean(),
          id: z.string(),
          tag: z.string(),
          title: z.string(),
          description: z.string(),
        }),
      )
      .refine((v) => v.some((s) => s.checked), {
        message: "Deve selecionar pelo menos uma estratégia",
      }),
    stopLoss: z.coerce.number().min(0).max(100).default(0),
    // stopWin: z.coerce.number().positive().max(100).default(0),
    stopEnable: z.boolean().default(false),
  })
  .refine((v) => !(v.stopEnable && v.stopLoss === 0), {
    message: "Deve ser maior que zero",
    path: ["stopLoss"],
  });

type createBotProfileValues = z.infer<typeof createBotProfileSchema>;

export const BotProfileForm: React.FC<{ onSubmitAction: () => void }> = ({ onSubmitAction }) => {
  const { addStockAnalysis } = useTrade();
  const strategies = useStrategyStore((state) => state.strategies);
  const {
    handleSubmit,
    control,
    register,
    formState: { isSubmitting },
    watch,
  } = useForm<createBotProfileValues>({
    resolver: zodResolver(createBotProfileSchema),
  });

  const stopEnable = watch("stopEnable");

  const onSubmit = handleSubmit(
    async (formData) => {
      const { name, interval, quantity, symbol, strategies, stopEnable, stopLoss } = formData;
      const session = await getSession();
      console.log(formData);

      await addStockAnalysis({
        name,
        interval,
        symbol,
        quantity,
        stopEnable,
        stopLoss,
        strategiesIds: strategies.filter((v) => v.checked).map((v) => v.id),
        accessToken: session?.accessToken || "",
      });

      onSubmitAction();
    },
    (error) => {
      console.log(error);
    },
  );

  const { fields: strategiesFields, append } = useFieldArray({
    control,
    name: "strategies",
  });

  useEffect(() => {
    strategies.forEach((s) => append({ checked: false, ...s }));
  }, [append, strategies]);

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <div>
        <Label>
          Apelido{" "}
          <span className="text-xs text-gray-400">(Nome para melhor identificação do seu gráfico)</span>
        </Label>
        <Input type="text" {...register("name")} />
      </div>

      <div className="flex gap-4">
        <div className="w-full">
          <Label>Símbolo</Label>

          <Controller
            control={control}
            name="symbol"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="btcbrl">BTCBRL</SelectItem>
                    <SelectItem value="adabrl">ADABRL</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="w-full">
          <Label>Intervalo</Label>

          <Controller
            control={control}
            name="interval"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="1s">1 segundo</SelectItem>
                    <SelectItem value="1m">1 minuto</SelectItem>
                    <SelectItem value="3m">3 minutos</SelectItem>
                    <SelectItem value="5m">5 minutos</SelectItem>
                    <SelectItem value="15m">15 minutos</SelectItem>
                    <SelectItem value="30m">30 minutos</SelectItem>
                    <SelectItem value="1h">1 hora</SelectItem>
                    <SelectItem value="2h">2 horas</SelectItem>
                    <SelectItem value="4h">4 horas</SelectItem>
                    <SelectItem value="6h">6 horas</SelectItem>
                    <SelectItem value="8h">8 horas</SelectItem>
                    <SelectItem value="12h">12 horas</SelectItem>
                    <SelectItem value="1d">1 dia</SelectItem>
                    <SelectItem value="3d">3 dias</SelectItem>
                    <SelectItem value="1w">1 semana</SelectItem>
                    <SelectItem value="1M">1 mês</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div>
        <Label>
          Valor{" "}
          <span className="text-xs text-gray-400">(Montante da moeda a ser negociado a cada transação)</span>
        </Label>
        <Input type="number" step="0.01" {...register("quantity")} />
      </div>

      <div>
        <Label className={stopEnable ? "" : "opacity-50"}>
          Parar perda <span className="text-xs text-gray-400">(Stop loss %)</span>
        </Label>

        <div className="flex w-full gap-4 ">
          <div className={`relative w-1/2 ${stopEnable ? "" : "opacity-50"}`}>
            <Input
              type="number"
              step="any"
              defaultValue={0}
              disabled={!stopEnable}
              {...register("stopLoss")}
            />
            <span className="absolute right-8 top-1/2 -translate-y-1/2">%</span>
          </div>

          <Controller
            control={control}
            name="stopEnable"
            render={({ field }) => (
              <div className="flex items-center gap-2">
                <Switch checked={field.value} onCheckedChange={field.onChange} />
                <Label>Ativado</Label>
              </div>
            )}
          />
        </div>
      </div>

      <div>
        <Label>Selecione as suas estratégias</Label>

        <ScrollArea className="h-48 pr-3">
          <div className="flex flex-col gap-2">
            {strategiesFields.map((strategy, index) => {
              return (
                <div key={index}>
                  <Controller
                    control={control}
                    name={`strategies.${index}.checked`}
                    render={({ field }) => (
                      <CheckboxCardInput
                        title={strategy.title}
                        description={strategy.description}
                        id={field.name}
                        {...field}
                        value={strategy.tag}
                      />
                    )}
                  />
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Criar"}
      </Button>
    </form>
  );
};
