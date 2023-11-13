import { Profile } from "@/entities/profile";

export interface ProfileBotService {
  create(profile: Omit<Profile, "id" | "inPosition" | "version">, accessToken: string): Promise<Profile>;
  get(accessToken: string): Promise<Profile[]>;
  delete(profileId: string, accessToken: string): Promise<string>;
  getProcessedProfile(profileId: string, version: number, accessToken: string): Promise<Profile | null>;
}
