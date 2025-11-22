// hooks/useProblemEditor.ts
"use client";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";


export function useProblemEditor(content: string, options?: { editable?: boolean }) {
  const editor = useEditor({
    extensions: EditorExtensions,
    content,
    editable: options?.editable ?? false,
    immediatelyRender: false,
  });

  return editor;
}


export const EditorExtensions = [
  StarterKit.configure({
    codeBlock: {
      HTMLAttributes: { class: "custom-codeblock" },
    },
  }),
  Markdown.configure({
    html: false,
    transformCopiedText: true,
    transformPastedText: true
  }),
];