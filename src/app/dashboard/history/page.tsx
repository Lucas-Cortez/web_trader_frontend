import { Container } from "@/components/app/Container";
import { OrderTable } from "@/components/app/OrderTable";

export default function HistoryPage(params: any) {
  return (
    <main className="h-full py-8">
      <Container>
        <OrderTable />
      </Container>
    </main>
  );
}
