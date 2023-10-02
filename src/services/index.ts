import { AuthService } from "./authService";
import { ProfileBotService } from "./profileBotService";
import { AppAuthService } from "./implementation/appAuthService";
import { AppProfileBotService } from "./implementation/appProfileBotService";

export const authService: AuthService = new AppAuthService();
export const profileBotService: ProfileBotService = new AppProfileBotService();
