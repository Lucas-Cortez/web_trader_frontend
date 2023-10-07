import { BotProfileForm } from "@/components/app/BotProfileForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const TEST = [
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

export default function DashboardPage() {
  return (
    <main className="h-full py-8">
      <div className="max-w-7xl mx-auto px-8 flex flex-col gap-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-medium">Análises</h1>

          <Dialog>
            <DialogTrigger asChild>
              <Button>Criar análise</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Criando perfil para análise do robô</DialogTitle>
                <DialogDescription>
                  Configure as opções necessárias para que o robô funcione de
                  acordo com as suas escolhas de análise
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                <BotProfileForm />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex justify-between">
          <div className="bg-gray-200 w-[22.5%] h-20 border border-gray-300 rounded-lg shadow-lg"></div>
          <div className="bg-gray-200 w-[22.5%] h-20 border border-gray-300 rounded-lg shadow-lg"></div>
          <div className="bg-gray-200 w-[22.5%] h-20 border border-gray-300 rounded-lg shadow-lg"></div>
          <div className="bg-gray-200 w-[22.5%] h-20 border border-gray-300 rounded-lg shadow-lg"></div>
        </div>

        <section className="flex flex-col gap-5">
          <div className="bg-gray-200 w-full h-60 border border-gray-300 rounded-lg shadow-lg flex justify-center items-center">
            <pre className=" h-[90%] w-[98%] bg-gray-400 shadow-inner shadow-gray-500 rounded-lg overflow-auto p-2 text-xs">
              <code className="prettyprint">
                {JSON.stringify(TEST, null, 2)}
              </code>
            </pre>
          </div>
          <div className="bg-gray-200 w-full h-60 border border-gray-300 rounded-lg shadow-lg"></div>
          <div className="bg-gray-200 w-full h-60 border border-gray-300 rounded-lg shadow-lg"></div>
        </section>
      </div>
    </main>
  );
}
