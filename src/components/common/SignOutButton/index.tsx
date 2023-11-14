"use client";

import { signOut } from "next-auth/react";
import { DetailedHTMLProps, HTMLAttributes } from "react";

type SignOutProviderProps = { children: React.ReactNode } & DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const SignOutButtonProvider: React.FC<SignOutProviderProps> = ({
  children,
  ...rest
}) => {
  return (
    <div onClick={() => signOut({ callbackUrl: "/entrar" })} {...rest}>
      {children}
    </div>
  );
};
