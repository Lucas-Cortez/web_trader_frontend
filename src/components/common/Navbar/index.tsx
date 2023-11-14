import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, History } from "lucide-react";
import Link from "next/link";
import { BackButton } from "../BackButton";
import { SignOutButtonProvider } from "../SignOutButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const Navbar: React.FC = async () => {
  const session = await getServerSession(authOptions);

  const nameInitial = session?.user.name
    .split(" ")
    .slice(0, 2)
    .map((v) => v[0])
    .join("")
    .toUpperCase();

  return (
    <header className="h-16 border-b fixed w-full bg-white z-10">
      <div className="w-full h-full flex justify-between items-center px-12 shadow-lg">
        <div>
          <BackButton />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-full h-10 w-10">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{nameInitial}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <Link href={"/painel/perfil"}>
                <DropdownMenuItem className="w-full h-full cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
              </Link>

              <Link href={"/painel/historico"}>
                <DropdownMenuItem className="w-full h-full cursor-pointer">
                  <History className="mr-2 h-4 w-4" />
                  <span>Histórico</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <SignOutButtonProvider className="">
              <DropdownMenuItem className="w-full h-full cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </SignOutButtonProvider>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
