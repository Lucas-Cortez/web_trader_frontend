"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputErrorMessage } from "../InputErrorMessage";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
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

        <Button type="submit">Cadastrar</Button>
      </form>
    </>
  );
};
