import { Container } from "@/components/common/Container";
import { OrderTable } from "@/components/common/OrderTable";

export default function HistoryPage(params: any) {
  return (
    <main className="h-full py-8">
      <Container>
        <OrderTable />
      </Container>
    </main>
  );
}
