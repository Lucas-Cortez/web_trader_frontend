import { Order } from "@/entities/order";
import { OrderService } from "../orderService";

export class AppOrderService implements OrderService {
  private readonly url = `${process.env.NEXT_PUBLIC_API_URL}/order`;

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
}
