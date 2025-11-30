"use client";

import { useEffect, useState } from "react";

// Streaming extractor
async function callExtractor(section: any, onChunk: (chunk: string) => void) {
  const response = await fetch("/api/mastra", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      topic: section.title,
      module: section.module.title,
      chapter: section.chapter.title,
      documentId: section.contentDocumentId,
      trackId: section.module.trackId,
    }),
  });

  if (!response.body) return;

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const text = decoder.decode(value);
    try {
      const chunk = JSON.parse(text);
      if (chunk.output) onChunk(chunk.output + "\n");
    } catch {
      onChunk(text + "\n");
    }
  }
}

export default function ExtractPage({
  params = { id: "d4414b20-6c1a-43e9-9ee8-716d2b3d8de2" },
}: any) {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("Press Start to begin extraction...");
  const [sections, setSections] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Load all sections
  useEffect(() => {
    async function loadTrack() {
      setLoading(true);

      const res = await fetch(
        `/api/tracks/d4414b20-6c1a-43e9-9ee8-716d2b3d8de2`
      );
      const track = await res.json();

      const allSections: any[] = [];
      track.modules?.forEach((module: any) => {
        module.chapters?.forEach((chapter: any) => {
          chapter.sections?.forEach((section: any) => {
            allSections.push({ ...section, module, chapter });
          });
        });
      });

      setSections(allSections);
      setLoading(false);
    }

    loadTrack();
  }, [params.id]);

  // 🔥 Start extraction process
  async function startExtraction() {
    for (let i = 0; i < sections.length; i++) {
      setActiveIndex(i);
      setOutput(""); // reset for each section

      await callExtractor(sections[i], (chunk) => {
        setOutput((prev) => prev + chunk);
      });

      // Delay before next section (optional)
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    setActiveIndex(null); // remove highlight when finished
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <div className="w-1/3 border-r p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Sections</h2>

        <ul className="space-y-2">
          {sections.map((section, i) => (
            <li
              key={section.id}
              className={`rounded px-3 py-2 ${
                i === activeIndex
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              <p className="text-sm font-semibold">{section.title}</p>
              <p className="text-xs text-gray-500">
                {section.module.title} → {section.chapter.title}
              </p>
            </li>
          ))}
        </ul>

        <button
          onClick={startExtraction}
          disabled={activeIndex !== null}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
        >
          {activeIndex === null ? "Start Extraction" : "Processing..."}
        </button>
      </div>

      {/* Right Panel */}
      <div className="w-2/3 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-2">Extractor Output</h2>
        <pre className="bg-black text-green-400 p-3 rounded h-full whitespace-pre-wrap">
          {output}
        </pre>
      </div>
    </div>
  );
}
