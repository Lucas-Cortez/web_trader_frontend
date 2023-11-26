"use client";

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputErrorMessage } from "../InputErrorMessage";
import { register } from "module";
import { Loader2 } from "lucide-react";
import { authService } from "@/services";
import { useToast } from "@/components/ui/use-toast";

const userNewPasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Deve preencher a senha antiga"),
    password: z.string().min(8, "Mínimo de 8 caracteres"),
    passwordConfirmation: z.string().min(1, "Confirmar a senha é necessário"),
  })
  .refine(({ password, passwordConfirmation }) => password === passwordConfirmation, {
    path: ["passwordConfirmation"],
    message: "Senhas são diferentes",
  });

type UserNewPasswordValues = z.infer<typeof userNewPasswordSchema>;

export const UserProfileForm: React.FC = () => {
  const { toast } = useToast();
  const session = useSession();
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isSubmitting },
  } = useForm<UserNewPasswordValues>({ resolver: zodResolver(userNewPasswordSchema) });

  const onSubmit = handleSubmit(async (data) => {
    const created = await authService.updatePassword(
      data.oldPassword,
      data.password,
      session.data?.accessToken || "",
    );

    if (!created) toast({ variant: "destructive", description: "Mudança de senha falhou" });

    reset();
    toast({ description: "Senha alterada" });
  });

  if (!session.data) return null;

  return (
    <form onSubmit={onSubmit}>
      <div className="backdrop-blur-sm shadow-lg p-3 rounded-lg w-full flex flex-col justify-between gap-4">
        <div className="self-start w-full sm:w-3/5">
          <fieldset className="mb-6">
            <p className="text-lg text-black mb-4 border-b border-b-black font-semibold">Perfil</p>

            <div className="flex flex-col gap-2">
              <div>
                <Label>Nome</Label>
                <Input value={session.data.user.name} disabled />
              </div>
              <div>
                <Label>E-mail</Label>
                <Input value={session.data.user.email} disabled />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <p className="text-lg text-black mb-4 border-b border-b-black font-semibold">
              Redefinição de senha
            </p>

            <div className="flex flex-col gap-2">
              <div>
                <Label>Senha antiga</Label>
                <Input {...register("oldPassword")} />
                <InputErrorMessage error={errors.oldPassword} />
              </div>
              <div>
                <Label>Nova senha</Label>
                <Input {...register("password")} />
                <InputErrorMessage error={errors.password} />
              </div>
              <div>
                <Label>Confirmação da nova senha</Label>
                <Input {...register("passwordConfirmation")} />
                <InputErrorMessage error={errors.passwordConfirmation} />
              </div>
            </div>
          </fieldset>
        </div>

        <div className="self-end gap-4 flex">
          <Button type={"submit"} disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Salvar"}
          </Button>
        </div>
      </div>
    </form>
  );
};
