import { AuthService } from "./authService";
import { AppAuthService } from "./implementation/appAuthService";

import { ProfileBotService } from "./profileBotService";
import { AppProfileBotService } from "./implementation/appProfileBotService";

import { BrokerService } from "./brokerService";
import { BinanceBrokerService } from "./implementation/binanceBrokerService";
import { MockBrokerService } from "./mocks/mockBrokerService";
import { BinanceCandleAdapter } from "@/utils/candleAdapter";

import { StrategyService } from "./strategyService";
import { AppStrategyService } from "./implementation/appStrategyService";

import { ApiKeyService } from "./apiKeyService";
import { AppApiKeyService } from "./implementation/appApiKeyService";

import { OrderService } from "./orderService";
import { AppOrderService } from "./implementation/appOrderService";

export const authService: AuthService = new AppAuthService();
export const profileBotService: ProfileBotService = new AppProfileBotService();
// export const brokerService: BrokerService = new MockBrokerService(new BinanceCandleAdapter());
export const brokerService: BrokerService = new BinanceBrokerService(new BinanceCandleAdapter());
export const strategyService: StrategyService = new AppStrategyService();
export const apiKeyService: ApiKeyService = new AppApiKeyService();
export const orderService: OrderService = new AppOrderService();
