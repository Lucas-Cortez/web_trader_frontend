import { Order } from "@/entities/order";
import { Trade } from "@/enums/trade";

export interface OrderService {
  getUserOrders(accessToken: string): Promise<Order[]>;
  createOrder(
    order: {
      tradeType: Trade;
      quantity: number;
      symbol: string;
      profileId: string;
      closingPrice: number;
    },
    accessToken: string,
  ): Promise<boolean>;
}
