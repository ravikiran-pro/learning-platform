"use client";

import CodeEditor from "@/components/CodeEditor";
import { use, useState, useEffect, useRef } from "react";
import ProblemView from "@/components/ProblemView";
import CodeEditorMenu from "@/components/CodeEditorMenu";
import TestResultPanel from "@/components/TestResultPanel";
import ConsolePanel from "@/components/ConsolePanel";

const EDITOR_BASE_HEIGHT = 600;

export default function Solve({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: problemId } = use(params);

  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("Dracula");
  const [code, setCode] = useState("");

  const [results, setResults] = useState<any[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"output" | "console">("output");

  // Resize State
  const [editorHeight, setEditorHeight] = useState(EDITOR_BASE_HEIGHT);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  async function runCode() {
    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          problemId,
        }),
      });

      const data = await res.json();
      const resultArray = data.results || [];

      setResults(resultArray);
      setLogs(resultArray.flatMap((t: any) => t.consoleLogs ?? []));
    } catch (err: any) {
      setResults([]);
      setLogs([`Error executing code: ${err.message}`]);
    }
  }

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!isDragging || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      let newHeight = e.clientY - rect.top;

      const MIN_EDITOR_HEIGHT = 200;
      const MIN_PANEL_HEIGHT = 120;

      newHeight = Math.max(
        MIN_EDITOR_HEIGHT,
        Math.min(rect.height - MIN_PANEL_HEIGHT, newHeight)
      );

      if (Math.abs(newHeight - editorHeight) > 5) {
        setEditorHeight(newHeight);
      }
    }

    function onUp() {
      setIsDragging(false);
    }

    if (isDragging) {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    }

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isDragging, editorHeight]);

  return (
    <main className="h-screen w-screen flex bg-[#f8fafc] text-black overflow-hidden">
      {/* LEFT PANE */}
      <div className="w-1/3 border-r border-gray-300 bg-white">
        <ProblemView setCode={setCode} problemId={problemId} />
      </div>

      {/* RIGHT PANE */}
      <div className="w-2/3 flex flex-col">
        {/* Toolbar */}
        <CodeEditorMenu
          language={language}
          setLanguage={setLanguage}
          theme={theme}
          setTheme={setTheme}
          runCode={runCode}
        />

        {/* Main Resizable Panel */}
        <div ref={containerRef} className="flex-1 flex flex-col min-h-0">
          {/* Editor */}
          <div style={{ height: `${editorHeight}px` }}>
            <CodeEditor
              language={language}
              theme={theme}
              value={code}
              onChange={(v) => setCode(v || "")}
            />
          </div>

          {/* Drag Handle */}
          <div
            className="h-2 cursor-row-resize flex items-center justify-center"
            onMouseDown={() => setIsDragging(true)}
          >
            <div className="w-20 h-[3px] bg-gray-400 rounded-full" />
          </div>

          {/* Output / Console */}
          <div
            style={{ height: `calc(100% - ${editorHeight}px)` }}
            className="flex flex-col min-h-0 flex-1"
          >
            {/* Tabs */}
            <div className="flex bg-[#1e1e1e] text-xs text-gray-300 border-l border-r border-t border-[#2d2d2d] rounded-t-md">
              <button
                onClick={() => setActiveTab("output")}
                className={`px-4 py-2 ${
                  activeTab === "output"
                    ? "text-white bg-[#2d2d2d] border-b-2 border-blue-500"
                    : "hover:bg-[#2d2d2d] hover:text-white"
                }`}
              >
                Output
              </button>
              <button
                onClick={() => setActiveTab("console")}
                className={`px-4 py-2 ${
                  activeTab === "console"
                    ? "text-white bg-[#2d2d2d] border-b-2 border-blue-500"
                    : "hover:bg-[#2d2d2d] hover:text-white"
                }`}
              >
                Console
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="bg-[#1e1e1e] border border-[#2d2d2d] rounded-b-md flex flex-col min-h-0 flex-1">
              <div className="overflow-y-auto p-3 text-sm font-mono flex-grow">
                {activeTab === "output" ? (
                  <TestResultPanel results={results} />
                ) : (
                  <ConsolePanel logs={logs} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
