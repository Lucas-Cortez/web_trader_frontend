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

export const Navbar: React.FC = () => {
  return (
    <header className="h-16 z-10">
      <div className="h-16 border-b fixed w-full bg-white">
        <div className="w-full h-full flex justify-between items-center px-12 shadow-lg">
          <div>
            <BackButton />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-full h-10 w-10">
                <Avatar className="h-10 w-10">
                  {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                  <AvatarFallback>LC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link href={"/painel/perfil"} className="flex w-full">
                    <User className="mr-2 h-4 w-4" />
                    <span>Perfil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <History className="mr-2 h-4 w-4" />
                  <span>Histórico</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
