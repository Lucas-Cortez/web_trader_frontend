import { Order } from "@/entities/order";
import { Trade } from "@/enums/trade";

export type PaginationOptions = {
  skip?: number;
  take?: number;
  startTime?: Date;
  endTime?: Date;
};

export interface OrderService {
  getUserOrders(accessToken: string): Promise<Order[]>;

  createOrder(
    profileId: string,
    order: {
      tradeType: Trade;
      closingPrice: number;
    },
    accessToken: string,
  ): Promise<boolean>;

  getProfileOrders(profileId: string, accessToken: string, options?: PaginationOptions): Promise<Order[]>;
}
