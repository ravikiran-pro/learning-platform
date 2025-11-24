export default function SkillInsightsCard() {
  return (
    <section className="bg-white border border-gray-300 p-6 rounded-md shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Skill Insights</h2>
      <div className="space-y-2 text-sm text-gray-800">
        <SkillMetric label="JavaScript Fundamentals" value={0.5} />
        <SkillMetric label="Async Concepts" value={0.5} />
        <SkillMetric label="System Design (upcoming)" value={0.5} />
      </div>
    </section>
  );
}

function SkillMetric({ label, value }:any) {
  return (
    <div>
      <p className="text-gray-800">{label}</p>
      <div className="w-full bg-gray-200 h-1.5 rounded mt-1">
        <div
          className="h-1.5 bg-neutral-800 rounded"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}
