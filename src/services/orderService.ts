import { Order } from "@/entities/order";

export interface OrderService {
  getUserOrders(accessToken: string): Promise<Order[]>;
}
