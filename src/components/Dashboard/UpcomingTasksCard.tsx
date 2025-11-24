export default function UpcomingTasksCard() {
  return (
    <section className="bg-white border border-gray-300 p-6 rounded-md shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Upcoming Tasks</h2>
      <ul className="text-sm text-gray-800 space-y-1">
        <li>• Finish “Scope & Closures” section</li>
        <li>• Solve 2 coding problems on Async</li>
        <li>• Read chapter on Event Loop</li>
      </ul>
    </section>
  );
}
