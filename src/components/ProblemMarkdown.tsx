"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ProblemMarkdownProps = {
  content: string;
};

export default function ProblemMarkdown({ content }: ProblemMarkdownProps) {
  return (
    <div
      className="
      prose prose-invert max-w-none 
      prose-pre:bg-[#1e1e2e] prose-pre:text-white 
      prose-pre:font-mono prose-code:font-mono
      prose-h1:text-2xl prose-h1:mb-4
      prose-h2:text-lg prose-h2:mt-6 prose-h2:mb-2
      prose-p:leading-loose prose-p:my-3 
      prose-li:my-2 
      prose-ul:my-3 prose-ol:my-3
      prose-code:px-1 prose-code:rounded
      prose-strong:text-white
      "
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
