import ProgressCard from "./ProgressCard";

export default function ProgressOverview() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ProgressCard title="JavaScript Track" progress={0.5} link="/js" />
      <ProgressCard title="Interview Preparation" progress={0.5} link="/js/prep" />
    </section>
  );
}
