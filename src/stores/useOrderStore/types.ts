import { Order } from "@/entities/order";

type OrderState = { orders: Order[]; total: number; loaded: boolean };

type OrderActions = {
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
};

export type OrderStore = OrderState & OrderActions;
