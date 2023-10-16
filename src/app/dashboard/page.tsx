import { BotProfileForm } from "@/components/app/BotProfileForm";
import { ChartsSection } from "@/components/app/ChartsSection";
import { CreateAnalysisModal } from "@/components/app/CreateAnalysisModal";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <main className="h-full py-8">
      <div className="max-w-7xl mx-auto px-8 flex flex-col gap-6">
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
      </div>
    </main>
  );
}
