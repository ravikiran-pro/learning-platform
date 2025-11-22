"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { loader } from "@monaco-editor/react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

type CodeEditorProps = {
  language?: string;
  value: string
  defaultValue?: string;
  theme?: string;
  suggestions?: boolean;
  onChange?: (value: string | undefined) => void;
};

export default function CodeEditor({
  language = "javascript",
  defaultValue = "",
  theme = "vs-dark",
  suggestions = true,
  onChange,
  value
}: CodeEditorProps) {
  
  useEffect(() => {
    loader.init().then((monaco) => {
      import("monaco-themes/themes/" + theme + ".json")
        .then((data: any) => monaco.editor.defineTheme(theme, data))
        .then(() => monaco.editor.setTheme(theme))
        .catch(() => monaco.editor.setTheme("vs-dark"));
    });
  }, [theme]);

  return (
    <MonacoEditor
      // height="100%"
      defaultLanguage={language}
      value={value}
      onChange={onChange}
      options={{
        fontSize: 15,
        fontFamily: "JetBrains Mono",
        minimap: { enabled: false },
        automaticLayout: true,
        suggestOnTriggerCharacters: suggestions,
        quickSuggestions: suggestions
          ? { other: true, comments: true, strings: true }
          : false,
        snippetSuggestions: suggestions ? "inline" : "none",
        scrollBeyondLastLine: false,
        lineHeight: 23,
        smoothScrolling: true,
      }}
    />
  );
}
