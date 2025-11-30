"use client";

import { useEffect, useState } from "react";
import ModuleItem from "./ModuleItem";
import type { Module, Track, Chapter, Section, SelectedSection } from "./types";

interface TrackSidebarProps {
  onSelectSection: (args: SelectedSection) => void;
  selectedSection: SelectedSection | null;
  tracks: Track;
}

export default function TrackSidebar({ onSelectSection, selectedSection, tracks: jsTrack }: TrackSidebarProps) {
  const [openModuleId, setOpenModuleId] = useState<string | null>(null);
  const [openChapterId, setOpenChapterId] = useState<string | null>(null);

  useEffect(() => {
  if (jsTrack?.id && !openModuleId) {  // 👈 only auto-open if not already open
    const mod = jsTrack.modules[0];
    const chapter = mod.chapters[0];
    const sec = chapter.sections[0];

    setOpenModuleId(mod.id);
    setOpenChapterId(chapter.id);
    onSelectSection({
      module: { id: mod.id, title: mod.title },
      chapter: { id: chapter.id, title: chapter.title },
      section: { id: sec.id, title: sec.title, contentDocumentId: sec.contentDocumentId},
    });
  }
}, [jsTrack?.id]); // 👈 No re-runs once stabilized


  if (!jsTrack?.id) return null;

  return (
    <aside className="w-100 h-screen flex flex-col overflow-y-auto bg-slate-900 text-slate-100 font-sans border-r border-slate-800">
      {/* Track header */}
      <div className="px-4 py-4 border-b border-slate-800">
        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Track</p>
        <h1 className="text-xl font-semibold">{jsTrack.title}</h1>
      </div>

      {/* Modules */}
      <div className="flex-1 py-2">
        {jsTrack.modules.map((mod) => (
          <ModuleItem
            key={mod.id}
            mod={mod}
            isOpen={openModuleId === mod.id}
            setOpenModuleId={setOpenModuleId}
            openChapterId={openChapterId}
            setOpenChapterId={setOpenChapterId}
            selectedSection={selectedSection}
            onSelectSection={onSelectSection}
          />
        ))}
      </div>
    </aside>
  );
}
