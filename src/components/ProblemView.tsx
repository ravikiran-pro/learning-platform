"use client";

import { generateStarterCode } from "@/app/utils/problem";
import { useProblemEditor } from "@/hooks/useProblemEditor";
import { EditorContent } from "@tiptap/react";
import { useEffect, useState } from "react";


export default function ProblemView({ setCode, problemId }: { setCode: Function, problemId?: string }) {
  const [title, setTitle] = useState("")
  const [level, setLevel] = useState("")
  const [section, setSection] = useState("")

  const editor = useProblemEditor("", { editable: true });

  useEffect(() => {
    if (!problemId || !editor) return

    fetch(`/api/problem/${problemId}`)
      .then(res => res.json())
      .then(res => {
        if (!res.success) return;
        let code = generateStarterCode(res.data)
        setTitle(res.data.title)
        setLevel(res.data?.tags[2])
        setSection(res.data?.tags[1])
        setCode(code)
      });

    fetch(`/api/problem/${problemId}/content`)
      .then(res => res.text())
      .then(content => {
        editor.commands.setContent(content);
      });
  }, [problemId, editor]);

  if (!editor) return null;

  return (
    <>
      <div className="p-4">
        <h1 className="text-xl font-semibold text-gray-800">
          {title}
        </h1>
        {
          section && <span className="inline-block px-2 py-1 mt-3 text-sm rounded bg-red-100 text-red-700">
            {section}
          </span>
        }
        {
          level && <span className="inline-block px-2 py-1 ml-2 mt-3 text-sm rounded bg-yellow-100 text-yellow-700">
            {level}
          </span>
        }
      </div>
      <div className="problem-container p-4 pt-1 bg-white text-gray-900 h-full overflow-auto space-y-4">
        <EditorContent editor={editor} />
      </div>
    </>
  );
}
