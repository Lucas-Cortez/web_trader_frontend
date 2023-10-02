import { Profile } from "@/entities/profile";
import { ProfileBotService } from "../profileBotService";

type ProfileResponse = {
  id: string;
  name: string;
  interval: string;
  symbol: string;
  strategiesIds: string[];
  quantity: number;
};

export class AppProfileBotService implements ProfileBotService {
  private readonly url = `${process.env.NEXT_PUBLIC_API_URL}/profile`;

  async create(
    name: string,
    interval: string,
    symbol: string,
    quantity: number,
    strategiesIds: string[],
    accessToken: string
  ): Promise<any> {
    console.log(this.url);

    const response = await fetch(this.url, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      method: "POST",
      body: JSON.stringify({
        name,
        interval,
        symbol,
        quantity,
        strategiesIds,
      }),
      cache: "no-store",
    });

    if (response.status !== 200) throw new Error("server error");

    const data = (await response.json()) as ProfileResponse;

    return new Profile(
      data.id,
      data.name,
      data.interval,
      data.symbol,
      data.strategiesIds,
      data.quantity
    );
  }
}
