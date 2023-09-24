"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputErrorMessage } from "../InputErrorMessage";

const signInSchema = z.object({
  email: z.string().email("E-mail é necessário"),
  password: z.string().min(1, "Senha é necessária"),
});

type SignInValues = z.infer<typeof signInSchema>;

export const SignInForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
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

      <Button type="submit">Entrar</Button>
    </form>
  );
};
