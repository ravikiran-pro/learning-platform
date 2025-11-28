import SectionItem from "./SectionItem";
import type { Chapter, Module, SelectedSection } from "./types";

interface Props {
  chap: Chapter;
  mod: Module;
  isOpen: boolean;
  setOpenChapterId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedSection: SelectedSection | null;
  onSelectSection: (args: SelectedSection) => void;
}

export default function ChapterItem({
  chap,
  mod,
  isOpen,
  setOpenChapterId,
  selectedSection,
  onSelectSection,
}: Props) {
  return (
    <div className="mt-1">
      <button
        onClick={() => setOpenChapterId((prev) => (prev === chap.id ? null : chap.id))}
        className="w-full flex items-center justify-between px-6 py-1.5 text-sm hover:bg-slate-800"
      >
        <span>{chap.title}</span>
        <span className="text-xs text-slate-500">{isOpen ? "▾" : "▸"}</span>
      </button>

      {isOpen &&
        chap.sections.map((sec) => (
          <SectionItem
            key={sec.id}
            sec={sec}
            mod={mod}
            chap={chap}
            isSelected={
              selectedSection?.chapter?.id === chap.id &&
              selectedSection?.section?.id === sec.id
            }
            onSelectSection={onSelectSection}
          />
        ))}
    </div>
  );
}
