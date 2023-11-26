import { Order } from "@/entities/order";
import { OrderService, PaginationOptions } from "../orderService";
import { Trade } from "@/enums/trade";

export class AppOrderService implements OrderService {
  private readonly url = `${process.env.NEXT_PUBLIC_API_URL}/order`;

  async createOrder(
    profileId: string,
    order: {
      tradeType: Trade;
      closingPrice: number;
    },
    accessToken: string,
  ): Promise<boolean> {
    const response = await fetch(`${this.url}/${profileId}`, {
      headers: { "Content-Type": "application/json", authorization: `Bearer ${accessToken}` },
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(order),
    });

    const data = (await response.json()) as { status: string };

    return data.status === "processing";
  }

  async getUserOrders(accessToken: string): Promise<Order[]> {
    const response = await fetch(`${this.url}/user`, {
      headers: { "Content-Type": "application/json", authorization: `Bearer ${accessToken}` },
      method: "GET",
      cache: "no-store",
    });

    // if (response.status !== 200) throw new Error("server error");

    const data = (await response.json()) as { orders: Order[] };

    const { orders } = data;

    return orders;
  }

  async getProfileOrders(
    profileId: string,
    accessToken: string,
    options?: PaginationOptions,
  ): Promise<Order[]> {
    const params = new URLSearchParams({
      ...(options?.endTime && { endTime: options.endTime.toString() }),
      ...(options?.startTime && { startTime: options.startTime.toString() }),
      ...(options?.skip && { skip: options.skip.toString() }),
      ...(options?.take && { take: options.take.toString() }),
    });

    const response = await fetch(`${this.url}/profile/${profileId}?${params.toString()}`, {
      headers: { "Content-Type": "application/json", authorization: `Bearer ${accessToken}` },
      method: "GET",
      cache: "no-store",
    });

    const data = (await response.json()) as { orders: Order[] };

    return data.orders;
  }
}
