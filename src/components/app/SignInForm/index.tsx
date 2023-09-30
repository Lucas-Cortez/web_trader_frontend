"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputErrorMessage } from "../InputErrorMessage";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const signInSchema = z.object({
  email: z.string().email("E-mail é necessário"),
  password: z.string().min(1, "Senha é necessária"),
});

type SignInValues = z.infer<typeof signInSchema>;

export const SignInForm: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = handleSubmit(async (formData) => {
    const { email, password } = formData;

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (response?.error)
      return toast({
        description: "Autenticação falhou",
        variant: "destructive",
      });

    if (response?.ok) return router.push(`/painel`);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="email">E-mail</Label>
        <Input type="email" {...register("email")} />
        <InputErrorMessage error={errors.email} />
      </div>

      <div>
        <Label htmlFor="password">Senha</Label>
        <Input type="password" {...register("password")} />
        <InputErrorMessage error={errors.password} />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Entrar"
        )}
      </Button>
    </form>
  );
};
