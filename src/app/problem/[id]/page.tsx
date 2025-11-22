"use client";

import JsonViewer from "@/components/JsonViewProps";
import { EditorExtensions, useProblemEditor } from "@/hooks/useProblemEditor";
import { EditorContent, generateJSON } from "@tiptap/react";
import { use, useEffect, useState } from "react";



export default function ProblemsPost({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id: problemId } = use(params)
  const [inputJson, setInputJson] = useState({});
  const [outputJson, setOutputJson] = useState({});

  const editor = useProblemEditor("", { editable: true });

  useEffect(() => {
    if (!problemId || !editor) return

    fetch(`/api/problem/${problemId}`)
      .then(res => res.json())
      .then(res => {
        if (!res.success) return;
        setInputJson(res.data.input || {});
        setOutputJson(res.data.expected || {});
      });

    fetch(`/api/problem/${problemId}/content`)
      .then(res => res.text())
      .then(content => {
        editor.commands.setContent(content);
      });
  }, [problemId, editor]);

  if (!editor) return null;


  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* LEFT SIDE – Full editor */}
      <div className="flex-1 problem-container p-8 bg-white text-gray-900 h-full overflow-auto space-y-4">
        <EditorContent editor={editor} />
      </div>

      <div className="w-[40%] flex flex-col border-l">
        <div className="flex-1 p-4 overflow-hidden border-b bg-white">
          <div className="text-gray-900 font-bold">Input Schema</div>
          <JsonViewer
            name="_input"
            value={inputJson}
            editable={true}
            collapsed={1}
          // onChange={(updated) => setInputJson(updated)}
          />
        </div>

        {/* Output JSON viewer */}
        <div className="flex-1 p-4 overflow-hidden bg-gray-50">
          <div className="text-gray-900 font-bold">Output Schema</div>
          <JsonViewer
            name="_output"
            value={outputJson}
            editable={false} collapsed={1} />
        </div>
      </div>
    </div>
  );
}
