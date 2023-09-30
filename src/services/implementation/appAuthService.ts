import { User } from "@/entities/user";
import { AuthService } from "../authService";

type AuthResponse = {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export class AppAuthService implements AuthService {
  private readonly url = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

  async login(
    email: string,
    password: string
  ): Promise<{ accessToken: string; user: User }> {
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
      user: new User(user.id, user.name, user.email),
    };
  }

  async register(
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ): Promise<{ accessToken: string; user: User }> {
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
      user: new User(user.id, user.name, user.email),
    };
  }
}
