import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

export const createStoreWithMiddleware = <T>(state: StateCreator<T, [], []>) =>
  create<T>()(devtools(state, { enabled: process.env.NODE_ENV !== "production" }));
