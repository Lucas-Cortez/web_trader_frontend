import { Strategy } from "@/entities/strategy";
import { StrategyService } from "../strategyService";

export class AppStrategyService implements StrategyService {
  private readonly url = `${process.env.NEXT_PUBLIC_API_URL}/strategy`;

  async getStrategies(): Promise<Strategy[]> {
    const response = await fetch(this.url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 * 60 * 24 },
    });

    const data = (await response.json()) as Strategy[];

    return data;
  }
}
