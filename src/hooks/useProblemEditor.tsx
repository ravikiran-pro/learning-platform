// hooks/useProblemEditor.ts
"use client";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import Link from "@tiptap/extension-link";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Blockquote from "@tiptap/extension-blockquote";
import Heading from "@tiptap/extension-heading";
import HorizontalRule from "@tiptap/extension-horizontal-rule";

import { Table} from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";

// Syntax highlighting (using highlight.js)
import { lowlight } from "lowlight/lib/common.js";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";

lowlight.registerLanguage("js", javascript);
lowlight.registerLanguage("ts", typescript);

export const EditorExtensions = [
  StarterKit.configure({
    codeBlock: false, // Replaced by CodeBlockLowlight
    heading: false, // Replaced by custom Heading
  }),

  Heading.configure({ levels: [1, 2, 3, 4] }),
  Blockquote,
  HorizontalRule,

  Link.configure({
    openOnClick: true,
    autolink: true,
    linkOnPaste: true,
    HTMLAttributes: {
      class: "text-blue-500 underline",
      target: "_blank",
    },
  }),

  CodeBlockLowlight.configure({
    lowlight,
    HTMLAttributes: { class: "custom-codeblock" },
  }),

  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableCell,
  TableHeader,

  Markdown.configure({
    html: false,
    transformCopiedText: true,
    transformPastedText: true,
  }),
];

export function useProblemEditor(content: string, options?: { editable?: boolean }) {
  return useEditor({
    extensions: EditorExtensions,
    content,
    editable: options?.editable ?? false,
    immediatelyRender: false,
  });
}
