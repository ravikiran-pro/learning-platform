import Link from "next/link";

export default function ProgressCard({ title, progress, link }:any) {
  return (
    <Link
      href={link}
      className="p-4 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 block"
    >
      <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      <div className="mt-2 h-1.5 w-full bg-gray-300 rounded">
        <div
          className="h-1.5 bg-neutral-800 rounded"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-600 mt-1">{progress}% completed</p>
    </Link>
  );
}
