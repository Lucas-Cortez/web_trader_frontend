"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputErrorMessage } from "../InputErrorMessage";
import { useToast } from "@/components/ui/use-toast";
import { authService } from "@/services";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

const signUpSchema = z
  .object({
    name: z.string().min(1, "Nome é necessário"),
    email: z.string().email("E-mail é necessário"),
    password: z.string().min(8, "Mínimo de 8 caracteres"),
    passwordConfirmation: z.string().min(1, "Confirmar a senha é necessário"),
  })
  .refine(
    ({ password, passwordConfirmation }) => password === passwordConfirmation,
    { path: ["passwordConfirmation"], message: "Senhas são diferentes" }
  );

type SignUpValues = z.infer<typeof signUpSchema>;

export const SignUpForm: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = handleSubmit(async (formData) => {
    const { name, email, password, passwordConfirmation } = formData;

    try {
      await authService.register(name, email, password, passwordConfirmation);

      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response?.error)
        return toast({
          description: "Registro falhou",
          variant: "destructive",
        });

      if (response?.ok) return router.push(`/painel`);
    } catch (error) {}
  });

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div>
          <Label htmlFor="email">
            E-mail
            <span className="text-red-600">*</span>
          </Label>
          <Input type="email" {...register("email")} />
          <InputErrorMessage error={errors.email} />
        </div>

        <div>
          <Label htmlFor="name">
            Nome
            <span className="text-red-600">*</span>
          </Label>
          <Input type="text" {...register("name")} />
          <InputErrorMessage error={errors.name} />
        </div>

        <div>
          <Label htmlFor="password">
            Senha
            <span className="text-red-600">*</span>
          </Label>
          <Input type="password" {...register("password")} />
          <InputErrorMessage error={errors.password} />
        </div>

        <div>
          <Label htmlFor="passwordConfirmation">
            Confirmar Senha
            <span className="text-red-600">*</span>
          </Label>
          <Input type="password" {...register("passwordConfirmation")} />
          <InputErrorMessage error={errors.passwordConfirmation} />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Cadastrar"
          )}
        </Button>
      </form>
    </>
  );
};
