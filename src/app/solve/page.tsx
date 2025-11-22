"use client";

import CodeEditor from "@/components/CodeEditor";
import { use, useState } from "react";
import ProblemView from "@/components/ProblemView";


export default function Solve({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id: problemId = "6921e09cfdf8d75fcec3836f" } = use(params)
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("Dracula");
  const [code, setCode] = useState('');

  const [output, setOutput] = useState("⚙️ Output will appear here...");

  async function runCode() {
    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      setOutput(data.result || data.stdout || data.stderr || data.error || "No output");
    } catch (err: any) {
      setOutput("Error executing code: " + err.message);
    }
  }

  return (
    <main className="h-screen w-screen flex bg-[#f8fafc] text-black overflow-hidden">

      {/* Left pane - Problem */}
      <div className="w-1/3 border-r border-gray-300 bg-white">
        <div className="p-4">
          <h1 className="text-xl font-semibold text-gray-800">
            Longest Valid Path in Grid
          </h1>
          <span className="inline-block px-2 py-1 text-sm rounded bg-yellow-100 text-yellow-700">
            Medium
          </span>
        </div>
        <ProblemView setCode={setCode} problemId={problemId}/>
      </div>



      {/* Right pane */}
      <div className="w-2/3 flex flex-col gap-2">

        {/* Toolbar */}
        <div className="flex gap-4 items-center bg-[#f1f5f9] px-5 py-3 border-b border-gray-300 text-sm">
          <span>Lang:</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white px-2 py-1 rounded border border-gray-300"
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python" disabled>Python (coming soon)</option>
          </select>

          <span>Theme:</span>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="bg-white px-2 py-1 rounded border border-gray-300"
          >
            <option>Dracula</option>
            <option>Monokai</option>
            <option>Nord</option>
          </select>

          <button
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded font-bold ml-auto"
            onClick={runCode}
          >
            ▶ Run
          </button>
        </div>

        {/* Editor */}
        <div className="flex-1">
          <CodeEditor
            language={language}
            theme={theme}
            value={code}
            defaultValue={code}
            onChange={(v) => setCode(v || "")}
          />
        </div>

        {/* Output */}
        <div className="h-32 bg-black text-green-400 text-sm p-3 border-t border-gray-700 overflow-auto rounded-b-lg font-mono">
          {output}
        </div>
      </div>
    </main>
  );

}
