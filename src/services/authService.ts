import { User } from "@/entities/user";

export interface AuthService {
  login(
    email: string,
    password: string
  ): Promise<{ accessToken: string; user: User }>;

  register(
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ): Promise<{ accessToken: string; user: User }>;
}
