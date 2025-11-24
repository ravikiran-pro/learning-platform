import Link from "next/link";

export default function QuickActionsFooter() {
  return (
    <footer className="pt-2 border-t border-gray-300 flex gap-4 text-xs text-gray-600">
      <Link href="/learn/js" className="hover:text-gray-800">JS Track</Link>
      <Link href="/interview" className="hover:text-gray-800">Interview</Link>
      <Link href="/mentor" className="hover:text-gray-800">AI Mentor</Link>
      <Link href="/profile" className="hover:text-gray-800">Profile</Link>
    </footer>
  );
}
