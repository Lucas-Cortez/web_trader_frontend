import { User } from "@/entities/user";
import { AuthService } from "../authService";
import { UserWithKey } from "@/entities/userWithKey";

type AuthResponse = {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    hasKey: boolean;
  };
};

export class AppAuthService implements AuthService {
  private readonly url = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

  async login(email: string, password: string): Promise<{ accessToken: string; user: UserWithKey }> {
    console.log(this.url);

    const response = await fetch(this.url, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    if (response.status !== 200) throw new Error("server error");

    const data = (await response.json()) as AuthResponse;

    const { user } = data;

    return {
      accessToken: data.accessToken,
      user: { id: user.id, name: user.name, email: user.email, hasKey: user.hasKey },
    };
  }

  async register(
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
  ): Promise<{ accessToken: string; user: UserWithKey }> {
    const response = await fetch(`${this.url}/register`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ email, password, name, passwordConfirmation }),
      cache: "no-store",
    });

    if (response.status !== 200) throw new Error("server error");

    const data = (await response.json()) as AuthResponse;

    const { user } = data;

    return {
      accessToken: data.accessToken,
      user: { id: user.id, name: user.name, email: user.email, hasKey: user.hasKey },
    };
  }

  async updatePassword(oldPassword: string, newPassword: string, accessToken: string): Promise<boolean> {
    const response = await fetch(`${this.url}/new-password`, {
      headers: { "Content-Type": "application/json", authorization: `Bearer ${accessToken}` },
      method: "POST",
      body: JSON.stringify({ oldPassword, newPassword }),
      cache: "no-store",
    });

    if (response.status !== 200) throw new Error("server error");

    // const data = (await response.json()) as { status: string };

    return true;
  }
}
