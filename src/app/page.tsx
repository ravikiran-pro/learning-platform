// app/dummy/page.tsx
import React from "react";

export default function DummyPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10">
      <h1 className="text-3xl font-bold">🚀 Dummy Page</h1>
      <p className="mt-2 text-gray-600">
        This is a placeholder page. You can now start building!
      </p>

      <button
        // onClick={() => alert("Clicked!")}
        className="mt-4 px-4 py-2 rounded bg-black text-white"
      >
        Click Me
      </button>
    </div>
  );
}
