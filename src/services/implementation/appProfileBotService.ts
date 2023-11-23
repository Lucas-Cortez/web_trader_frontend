import { Profile } from "@/entities/profile";
import { ProfileBotService } from "../profileBotService";
import { sleep } from "@/utils/helpers/sleep";

const MS_INTERVAL_POLLING = 3 * 1000;
const POLLING_TIMEOUT = 60 * 1000;

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

  async create(profile: Omit<Profile, "id" | "inPosition" | "version">, accessToken: string): Promise<any> {
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

  private async *processPollingProfile(profileId: string, oldVersion: number, accessToken: string) {
    const limitTime = new Date().getTime() + POLLING_TIMEOUT;

    while (true) {
      const endTime = new Date().getTime();
      if (limitTime < endTime) {
        yield null;
        break;
      }

      try {
        const info = await this.getVersionizedProfile(profileId, oldVersion, accessToken);
        yield info;

        if (info && info.version > oldVersion) {
          console.log(`New version detected (${info.version}). Stopping the polling.`);
          break;
        }

        await sleep(MS_INTERVAL_POLLING);
      } catch (error) {
        if (error instanceof Error) console.error("Error fetching data:", error.message);
        break;
      }
    }
  }

  private async getVersionizedProfile(
    profileId: string,
    version: number,
    accessToken: string,
  ): Promise<Profile | null> {
    const response = await fetch(`${this.url}/version/${profileId}/${version}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (response.status !== 200) throw new Error("server error");

    const data = (await response.json()) as Profile | null;

    return data;
  }

  async getProcessedProfile(
    profileId: string,
    version: number,
    accessToken: string,
  ): Promise<Profile | null> {
    let profile: Profile | null = null;

    for await (const res of this.processPollingProfile(profileId, version, accessToken)) {
      if (res) profile = res;
    }

    return profile;
  }
}
