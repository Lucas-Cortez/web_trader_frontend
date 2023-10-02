import { authService } from "@/services";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type AuthCredentials = {
  email: string;
  password: string;
};

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/entrar", error: "/error", newUser: "/cadastrar" },
  session: { maxAge: 60 * 60 },
  providers: [
    CredentialsProvider({
      name: "App Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as AuthCredentials;

        const response = await authService.login(email, password);

        if (!response) return null;

        const { accessToken, user } = response;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          jwtToken: accessToken,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // console.log("===================TOKEN======================");
      // console.log(token);
      // console.log(user);
      // console.log("==============================================");

      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.jwtToken = user.jwtToken;
      }

      return token;
    },
    async session({ session, token }) {
      // console.log("===================SESSION======================");
      // console.log(session);
      // // console.log(user);
      // console.log(token);
      // console.log("================================================");

      session.user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
      };
      session.accessToken = token.jwtToken as string;

      // const expiration = new Date(Number(token.exp) * 1000);
      // const currentDate = new Date();

      // console.log(token.exp);

      // console.log("currentDate: ", currentDate);
      // console.log(currentDate > expiration);

      // // if (currentDate > expiration) {
      // //   return Promise.reject({
      // //     error: "Session has expired",
      // //   });
      // // }

      return session;
    },
  },
};
