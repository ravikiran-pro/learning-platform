import Link from "next/link";

export default function ContinueLearningCard({  }:any) {
  return (
    <section className="bg-white border border-gray-300 p-6 rounded-md shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Continue Learning</h2>
      <p className="text-gray-700 text-sm mt-1">
        Nothing yet. Start your journey to see progress.
        {/* Last visited: Chapter – Basics, Section – What is JavaScript? */}
      </p>
      <Link
        href="/learn/js"
        className="mt-4 inline-block bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 text-sm rounded-md"
      >
        Start Learning
        {/* Continue */}
      </Link>
    </section>
  );
}

