import { ChartsSection } from "@/components/app/ChartsSection";
import { Container } from "@/components/app/Container";
import { CreateAnalysisModal } from "@/components/app/CreateAnalysisModal";

export default function DashboardPage() {
  return (
    <main className="h-full py-8">
      <Container>
        <div className="flex justify-between">
          <h1 className="text-2xl font-medium">Análises</h1>

          <CreateAnalysisModal />
        </div>

        <div className="flex justify-between">
          <div className="bg-gray-200 w-[22.5%] h-20 border border-gray-300 rounded-lg shadow-lg"></div>
          <div className="bg-gray-200 w-[22.5%] h-20 border border-gray-300 rounded-lg shadow-lg"></div>
          <div className="bg-gray-200 w-[22.5%] h-20 border border-gray-300 rounded-lg shadow-lg"></div>
          <div className="bg-gray-200 w-[22.5%] h-20 border border-gray-300 rounded-lg shadow-lg"></div>
        </div>

        <ChartsSection />
      </Container>
    </main>
  );
}
