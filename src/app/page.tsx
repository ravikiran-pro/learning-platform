import ContinueLearningCard from "@/components/Dashboard/ContinueLearningCard";
import HeaderNav from "@/components/Dashboard/HeaderNav";
import PerformanceChartCard from "@/components/Dashboard/PerformanceChartCard";
import ProgressOverview from "@/components/Dashboard/ProgressOverview";
import SkillInsightsCard from "@/components/Dashboard/SkillInsightsCard";
import UpcomingTasksCard from "@/components/Dashboard/UpcomingTasksCard";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-200">
      <main className="max-w-6xl mx-auto p-8">
        <HeaderNav />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-8">
          {/* Left Side – Main */}
          <div className="lg:col-span-3 space-y-6">
            <ProgressOverview />
            <ContinueLearningCard />
          </div>

          {/* Right Side – Side Panel */}
          <div className="lg:col-span-2 space-y-6">
            <PerformanceChartCard />
            <SkillInsightsCard />
            <UpcomingTasksCard />
          </div>
        </div>
      </main>
    </div>
  );
}