import { StateCreator } from "zustand";
import { OrderStore } from "./types";
import { createStoreWithMiddleware } from "../createStoreWithMiddleware";
import { Order } from "@/entities/order";

const orderStore: StateCreator<OrderStore, [], []> = (set) => ({
  orders: [],
  total: 0,
  loaded: false,
  setOrders: (orders) => set(() => ({ orders, total: orders.length, loaded: true })),
  addOrder: (order: Order) => set((state) => ({ orders: [...state.orders, order], total: state.total + 1 })),
});

export const useOrderStore = createStoreWithMiddleware(orderStore);
