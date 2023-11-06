import { Profile } from "@/entities/profile";

export interface ProfileBotService {
  create(
    profile: Omit<Profile, "id" | "inPosition">,
    accessToken: string,
    // name: string,
    // interval: string,
    // symbol: string,
    // quantity: number,
    // strategiesIds: string[],
  ): Promise<Profile>;

  get(accessToken: string): Promise<Profile[]>;

  delete(profileId: string, accessToken: string): Promise<string>;
}
