import { SignUpForm } from "@/components/common/SignUpForm";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className="flex items-center justify-center h-screen">
      <Card className="w-96">
        <CardHeader className="text-center">
          <CardTitle>Webtrader</CardTitle>
          <CardDescription>Cadastrar</CardDescription>
        </CardHeader>

        <CardContent>
          <SignUpForm />
        </CardContent>

        <CardFooter className="text-center">
          <p className="w-full text-sm">
            Ja possui cadastro?{" "}
            <span className="text-gray-600 underline">
              <Link href={"/entrar"}>Clique aqui</Link>
            </span>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
