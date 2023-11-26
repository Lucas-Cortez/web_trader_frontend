import { Candle } from "@/entities/candle";
import { CandleListener } from "@/CandleListener";
import { Profile } from "@/entities/profile";
import { Order } from "@/entities/order";

type TradeState = {
  tradeProfiles: Record<string, Profile & { data: Candle[]; listener: CandleListener; orders: Order[] }>;
};

type TradeActions = {
  addCandleData: (profile: Profile, data: Candle[], listener: CandleListener, orders: Order[]) => void;
  removeCandleData: (id: string) => void;
  updateLastData: (id: string, data: Candle) => void;
  reset: () => void;
  updateProfile: (id: string, profile: Partial<Profile>) => void;
  addProfileOrder: (id: string, order: Order) => void;
};

export type TradeStore = TradeState & TradeActions;
