export default function PerformanceChartCard() {
  return (
    <section className="bg-white border border-gray-300 p-6 rounded-md shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Performance Overview</h2>
      <div className="text-sm text-gray-600">
        <div className="h-28 bg-gray-200 rounded-md flex items-center justify-center">
          <span className="text-gray-500 text-xs">[No Track]</span>
        </div>
      </div>
    </section>
  );
}
