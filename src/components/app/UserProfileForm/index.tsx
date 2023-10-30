"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";

export const UserProfileForm: React.FC = () => {
  const { data } = useSession();

  if (!data) return null;

  return (
    <div className="bg-gray-50 shadow-lg p-3 rounded-lg w-full flex flex-col justify-between gap-4">
      <div className="self-start w-full sm:w-3/5">
        <fieldset className="mb-6">
          <p className="text-lg text-gray-600 mb-4 border-b border-b-gray-400 font-semibold">Perfil</p>

          <div className="flex flex-col gap-2">
            <div>
              <Label>Nome</Label>
              <Input value={data.user.name} disabled />
            </div>
            <div>
              <Label>E-mail</Label>
              <Input value={data.user.email} disabled />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <p className="text-lg text-gray-600 mb-4 border-b border-b-gray-400 font-semibold">
            Redefinição de senha
          </p>

          <div className="flex flex-col gap-2">
            <div>
              <Label>Senha antiga</Label>
              <Input />
            </div>
            <div>
              <Label>Nova senha</Label>
              <Input />
            </div>
            <div>
              <Label>Confirmação da nova senha</Label>
              <Input />
            </div>
          </div>
        </fieldset>
      </div>

      <div className="self-end gap-4 flex">
        <Button type={"button"}>Salvar</Button>
      </div>
    </div>
  );
};
