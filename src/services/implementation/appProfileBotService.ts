import { Profile } from "@/entities/profile";
import { ProfileBotService } from "../profileBotService";

export class AppProfileBotService implements ProfileBotService {
  private readonly url = `${process.env.NEXT_PUBLIC_API_URL}/profile`;

  async get(accessToken: string): Promise<Profile[]> {
    const response = await fetch(this.url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (response.status !== 200) throw new Error("server error");

    const data = (await response.json()) as Profile[];

    // return data.map((v) => new Profile(v.id, v.name, v.interval, v.symbol, v.strategiesIds, v.quantity));
    return data.map((v) => ({ ...v }));
  }

  async create(profile: Omit<Profile, "id" | "inPosition">, accessToken: string): Promise<any> {
    const response = await fetch(this.url, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      method: "POST",
      body: JSON.stringify({
        interval: profile.interval,
        symbol: profile.symbol,
        strategiesIds: profile.strategiesIds,
        quantity: profile.quantity,
        name: profile.name,
        stopEnable: profile.stopEnable,
        stopLoss: profile.stopLoss,
      }),
      cache: "no-store",
    });

    if (response.status !== 200) throw new Error("server error");

    const data = (await response.json()) as Profile;

    return { ...data };
  }

  async delete(profileId: string, accessToken: string): Promise<string> {
    const response = await fetch(`${this.url}/${profileId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (response.status !== 200) throw new Error("server error");

    const data = (await response.json()) as { status: string };

    return data.status;
  }
}
