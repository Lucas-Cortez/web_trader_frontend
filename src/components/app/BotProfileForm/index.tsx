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

const createBotProfileSchema = z.object({
  name: z.string(),
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
});

type createBotProfileValues = z.infer<typeof createBotProfileSchema>;

type Strategy = {
  id: string;
  tag: string;
  name: string;
  title: string;
  description: string;
};

const STRATEGIES: Strategy[] = [
  {
    id: "651a2f56ef1632834c286aeb",
    tag: "bollinger_bands",
    name: "Bollinger Bands",
    title: "Bandas de Bollinger (BB)",
    description:
      "É uma estratégia de análise na qual são utilizadas duas bandas que se ajustam à volatilidade do mercado. A compra ocorre quando o preço atinge a banda inferior, e a venda quando o preço atinge a banda superior.",
  },
  {
    id: "651a2f56ef1632834c286aec",
    tag: "relative_strength_index",
    name: "Relative Strength Index",
    title: "Indíce de Força Relativa (IFR)",
    description:
      "É uma estratégia na qual é utilizado um indicador para identificar oportunidades de compra quando o ativo está sobrevendido (abaixo de 30) e de venda quando está sobrecomprado (acima de 70). Isso ajuda a tomar decisões de negociação com base na força e direção da tendência do mercado.",
  },
];

async function getStrategies(): Promise<Strategy[]> {
  return STRATEGIES;
}

export const BotProfileForm: React.FC<{ onSubmitAction: () => void }> = ({ onSubmitAction }) => {
  const { addStockAnalysis } = useTrade();
  const { handleSubmit, control, register } = useForm<createBotProfileValues>({
    resolver: zodResolver(createBotProfileSchema),
  });

  const onSubmit = handleSubmit(
    async (formData) => {
      const { name, interval, quantity, symbol, strategies } = formData;
      const session = await getSession();
      console.log(formData);

      await addStockAnalysis({
        name,
        interval,
        symbol,
        quantity,
        strategiesIds: strategies.filter((v) => v.checked).map((v) => v.id),
        accessToken: session?.accessToken || "",
      });

      onSubmitAction();
    },
    (error) => {
      console.log(error);
    },
  );

  const { fields: strategies, append } = useFieldArray({
    control,
    name: "strategies",
  });

  useEffect(() => {
    (async () => {
      const data = await getStrategies();
      data.forEach((s) => append({ checked: false, ...s }));
    })();
  }, [append]);

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
                    <SelectItem value="5m">5 minutos</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div>
        <Label>
          Valor <span className="text-xs text-gray-400">(Montante a ser negociado a cada transação)</span>
        </Label>
        <Input type="number" step="0.01" {...register("quantity")} />
      </div>

      <div>
        <Label>Selecione as suas estratégias</Label>

        <ScrollArea className="h-40 pr-3">
          <div className="flex flex-col gap-2">
            {strategies.map((strategy, index) => {
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

      <Button type="submit">Criar</Button>
    </form>
  );
};
