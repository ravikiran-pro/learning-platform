import type { Module, Chapter, Section, SelectedSection } from "./types";

interface Props {
  sec: Section;
  mod: Module;
  chap: Chapter;
  isSelected: boolean;
  onSelectSection: (args: SelectedSection) => void;
}

export default function SectionItem({ sec, mod, chap, isSelected, onSelectSection }: Props) {
  return (
    <button
      onClick={() =>
        onSelectSection({
          module: { id: mod.id, title: mod.title },
          chapter: { id: chap.id, title: chap.title },
          section: { id: sec.id, title: sec.title, contentDocumentId: sec.contentDocumentId },
        })
      }
      className={`w-full text-left text-sm px-8 py-1 rounded ${
        isSelected
          ? "bg-slate-800 text-white font-semibold border-l-4 border-blue-500"
          : "text-slate-400 hover:text-slate-100 hover:bg-slate-800"
      }`}
    >
      • {sec.title}
    </button>
  );
}
