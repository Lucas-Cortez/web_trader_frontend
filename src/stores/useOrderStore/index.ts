import { StateCreator } from "zustand";
import { OrderStore } from "./types";
import { createStoreWithMiddleware } from "../createStoreWithMiddleware";

const orderStore: StateCreator<OrderStore, [], []> = (set) => ({
  orders: [],
  total: 0,
  setOrders: (orders) => set(() => ({ orders, total: orders.length })),
});

export const useOrderStore = createStoreWithMiddleware(orderStore);
