import { Container } from "@/components/common/Container";
import { OrderTable } from "@/components/common/OrderTable";
import { Order } from "@/entities/order";
import { authOptions } from "@/lib/auth";
import { orderService } from "@/services";
import { getServerSession } from "next-auth";

// const getUserOrders = async () => {
//   const session = await getServerSession(authOptions);
//   const orders = await orderService.getUserOrders(session?.accessToken || "");
//   return orders;
// };

export default function HistoryPage() {
  // const orders = await getUserOrders();

  return (
    <main className="h-full py-8">
      <Container>
        <OrderTable />
      </Container>
    </main>
  );
}
