import { Candle } from "@/entities/candle";
import { CandleListener } from "@/CandleListener";
import { Profile } from "@/entities/profile";

type TradeState = {
  tradeProfiles: Record<string, Profile & { data: Candle[]; listener: CandleListener }>;
};

type TradeActions = {
  addCandleData: (profile: Profile, data: Candle[], listener: CandleListener) => void;
  removeCandleData: (id: string) => void;
  updateLastData: (id: string, data: Candle) => void;
  reset: () => void;
  updateProfile: (id: string, profile: Partial<Profile>) => void;
};

export type TradeStore = TradeState & TradeActions;
