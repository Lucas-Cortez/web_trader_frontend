import { Order } from "@/entities/order";

type OrderState = { orders: Order[]; total: number };

type OrderActions = {
  setOrders: (orders: Order[]) => void;
};

export type OrderStore = OrderState & OrderActions;
