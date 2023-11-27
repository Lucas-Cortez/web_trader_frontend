"use client";

import { useOrderStore } from "@/stores/useOrderStore";
import { OrderStore } from "@/stores/useOrderStore/types";
import { ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

const StoreContext = createContext<typeof useOrderStore>(null!);

export const ZustandProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const storeRef = useRef<typeof useOrderStore>();

  if (!storeRef.current) storeRef.current = useOrderStore;

  return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>;
};

const useStoreInContext = (selector: (state: OrderStore) => unknown) => {
  const store = useContext(StoreContext);

  if (!store) throw new Error("Missing StoreProvider");

  return useStore(store, selector);
};

function Comp() {
  const opa = useStoreInContext((state) => state.total);

  return <div>oi</div>;
}
