import React from "react";

interface CodeEditorMenuProps {
  language: string;
  setLanguage: (lang: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
  runCode: () => void;
}

const CodeEditorMenu: React.FC<CodeEditorMenuProps> = ({
  language,
  setLanguage,
  theme,
  setTheme,
  runCode,
}) => {
  return (
    <div className="flex gap-4 items-center bg-[#f1f5f9] px-5 py-3 border-b border-gray-300 text-sm">
      <span>Lang:</span>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="bg-white px-2 py-1 rounded border border-gray-300"
      >
        <option value="javascript">JavaScript</option>
        <option value="typescript">TypeScript</option>
        <option value="python" disabled>
          Python (coming soon)
        </option>
      </select>

      <span>Theme:</span>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="bg-white px-2 py-1 rounded border border-gray-300"
      >
        <option value="Dracula">Dracula</option>
        <option value="Monokai">Monokai</option>
        <option value="Nord">Nord</option>
      </select>

      <button
        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded font-bold ml-auto"
        onClick={runCode}
      >
        ▶ Run
      </button>
    </div>
  );
};

export default CodeEditorMenu;
