import { AuthService } from "./authService";
import { AppAuthService } from "./implementation/appAuthService";

import { ProfileBotService } from "./profileBotService";
import { AppProfileBotService } from "./implementation/appProfileBotService";

import { BrokerService } from "./brokerService";
import { MockBrokerService } from "./mocks/mockBrokerService";
import { BinanceCandleAdapter } from "@/utils/candleAdapter";

export const authService: AuthService = new AppAuthService();
export const profileBotService: ProfileBotService = new AppProfileBotService();
export const brokerService: BrokerService = new MockBrokerService(new BinanceCandleAdapter());
