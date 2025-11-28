import ChapterItem from "./ChapterItem";
import type { Module, SelectedSection } from "./types";

interface Props {
  mod: Module;
  isOpen: boolean;
  setOpenModuleId: React.Dispatch<React.SetStateAction<string | null>>;
  openChapterId: string | null;
  setOpenChapterId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedSection: SelectedSection | null;
  onSelectSection: (args: SelectedSection) => void;
}

export default function ModuleItem({
  mod,
  isOpen,
  setOpenModuleId,
  openChapterId,
  setOpenChapterId,
  selectedSection,
  onSelectSection,
}: Props) {
  return (
    <div className="border-b border-slate-800 last:border-b-0">
      <button
        onClick={() => setOpenModuleId((prev) => (prev === mod.id ? null : mod.id))}
        className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium hover:bg-slate-800"
      >
        <span>{mod.title}</span>
        <span className="text-xs text-slate-500">{isOpen ? "▾" : "▸"}</span>
      </button>

      {isOpen &&
        mod.chapters.map((chap) => (
          <ChapterItem
            key={chap.id}
            chap={chap}
            mod={mod}
            isOpen={openChapterId === chap.id}
            setOpenChapterId={setOpenChapterId}
            selectedSection={selectedSection}
            onSelectSection={onSelectSection}
          />
        ))}
    </div>
  );
}
