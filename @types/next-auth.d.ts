import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: {
      id: string;
      name: string;
      email: string;
      hasKey: boolean;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    jwtToken: string;
    hasKey: boolean;
  }
}
