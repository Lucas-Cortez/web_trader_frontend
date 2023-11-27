"use client";

import { TestStore, testStore, useTestStore } from "@/stores/testStore";
import { ReactNode, createContext, useContext, useRef } from "react";
import { StoreApi, createStore, useStore } from "zustand";

// const StoreContext = createContext<typeof useTestStore>(null!);

// export const ZustandProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const storeRef = useRef<typeof useTestStore>();

//   if (!storeRef.current) storeRef.current = useTestStore;

//   return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>;
// };

// export const useStoreInContext = (selector: (state: TestStore) => unknown) => {
//   const store = useContext(StoreContext);

//   if (!store) throw new Error("Missing StoreProvider");

//   return useStore(store, selector);
// };

const StoreContext = createContext<StoreApi<TestStore>>(null!);

export const ZustandProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const storeRef = useRef<any>();

  if (!storeRef.current) storeRef.current = createStore(testStore);

  return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>;
};

export const useStoreInContext = (selector: (state: TestStore) => unknown) => {
  const store = useContext(StoreContext);

  if (!store) throw new Error("Missing StoreProvider");

  return useStore(store, selector);
};
