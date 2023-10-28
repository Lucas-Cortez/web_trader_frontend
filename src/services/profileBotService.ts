import { Profile } from "@/entities/profile";

export interface ProfileBotService {
  create(
    name: string,
    interval: string,
    symbol: string,
    quantity: number,
    strategiesIds: string[],
    accessToken: string,
  ): Promise<Profile>;

  get(accessToken: string): Promise<Profile[]>;

  delete(profileId: string, accessToken: string): Promise<string>;
}
