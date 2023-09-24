import { SignInForm } from "@/components/app/SignInForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="flex items-center justify-center h-screen">
      <Card className="w-96">
        <CardHeader className="text-center">
          <CardTitle>Webtrader</CardTitle>
          <CardDescription>Entrar</CardDescription>
        </CardHeader>

        <CardContent>
          <SignInForm />
        </CardContent>

        <CardFooter className="text-center">
          <p className="w-full text-sm">
            Ainda não possui cadastro?{" "}
            <span className="text-gray-600 underline">
              <Link href={"/cadastrar"}>Clique aqui</Link>
            </span>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
