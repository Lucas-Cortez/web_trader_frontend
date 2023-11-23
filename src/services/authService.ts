import { UserWithKey } from "@/entities/userWithKey";

export interface AuthService {
  login(email: string, password: string): Promise<{ accessToken: string; user: UserWithKey }>;

  register(
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
  ): Promise<{ accessToken: string; user: UserWithKey }>;

  updatePassword(oldPassword: string, newPassword: string, accessToken: string): Promise<boolean>;
}
