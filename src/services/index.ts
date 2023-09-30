import { AuthService } from "./authService";
import { AppAuthService } from "./implementation/appAuthService";

export const authService: AuthService = new AppAuthService();
