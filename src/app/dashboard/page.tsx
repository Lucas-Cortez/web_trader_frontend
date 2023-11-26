import { ChartsSection } from "@/components/common/ChartsSection";
import { Container } from "@/components/common/Container";
import { CreateAnalysisModal } from "@/components/common/CreateAnalysisModal";

export default function DashboardPage() {
  return (
    <main className="h-full py-8">
      <Container>
        <div className="flex justify-between">
          <h1 className="text-2xl font-medium">Análises</h1>

          <CreateAnalysisModal />
        </div>

        <ChartsSection />
      </Container>
    </main>
  );
}
