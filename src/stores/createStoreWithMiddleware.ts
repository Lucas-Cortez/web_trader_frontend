import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

export const createStoreWithMiddleware = <T>(state: StateCreator<T, [], []>) => {
  return create<T>()(
    devtools(state, {
      enabled: process.env.NODE_ENV !== "production",
      // enabled: true,
      name: state.name,
    }),
  );
};
