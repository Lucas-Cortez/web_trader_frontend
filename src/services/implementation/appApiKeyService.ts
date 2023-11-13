import { ApiKeyService } from "../apiKeyService";

export class AppApiKeyService implements ApiKeyService {
  private readonly url = `${process.env.NEXT_PUBLIC_API_URL}/api-key`;

  async create(api: { key: string; secret: string }, accessToken: string): Promise<string> {
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ key: api.key, secret: api.secret }),
      cache: "no-store",
    });

    if (response.status !== 200) throw new Error("server error");

    return "created";
  }

  async delete(accessToken: string): Promise<string> {
    const response = await fetch(this.url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (response.status !== 200) throw new Error("server error");

    return "deleted";
  }
}
