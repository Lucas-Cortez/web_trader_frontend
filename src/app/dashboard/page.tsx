import { ProfileForm } from "@/components/app/ProfileForm";
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

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";

export default function DashboardPage() {
  return (
    <main className="h-screen pt-8">
      <div className="max-w-7xl mx-auto px-8 flex flex-col">
        <div className="flex justify-between">
          <h1 className="text-2xl font-medium">Gráficos</h1>

          {/* <Sheet>
            <SheetTrigger>
              <Button>Criar análise</Button>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <SheetTitle>Criando perfil para análise do robô</SheetTitle>
                <SheetDescription>
                  Configure as opções necessárias para que o robô funcione de
                  acordo com as sua escolhas de análise
                </SheetDescription>
              </SheetHeader>

              <div className="py-4">
                <ProfileForm />
              </div>
            </SheetContent>
          </Sheet> */}

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
                <ProfileForm />
              </div>

              {/* <DialogFooter>
                <Button type="submit">Criar</Button>
              </DialogFooter> */}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </main>
  );
}