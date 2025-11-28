'use client'

import TrackSidebar from "@/components/Sidebar/TrackSidebar";
import { Chapter, Module, Section, SelectedSection, Track } from "@/components/Sidebar/types";
import { useProblemEditor } from "@/hooks/useProblemEditor";
import { EditorContent } from "@tiptap/react";
import { useEffect, useState } from "react";

export default function JsPage() {

  const [selectedSection, setSelectedSection] = useState<SelectedSection | null>(null);
  const [tracks, setTracks] = useState<Track>({
    id: '',
    title: '',
    modules: []
  });
  const [section, setSectionContent] = useState<string>('')

  const editor = useProblemEditor("", { editable: false });

  const handleSelection = ({ section, chapter, module }: SelectedSection) => {
    setSelectedSection({
      module: {
        id: module.id,
        title: module.title
      },
      chapter: {
        id: chapter.id,
        title: chapter.title
      },
      section: {
        id: section.id,
        title: section.title
      }
    });
    return
  }

  useEffect(() => {
    const fetchData = async () => {
      console.log("useEffect running");

      try {
        const res = await fetch(`/api/tracks/d4414b20-6c1a-43e9-9ee8-716d2b3d8de2`);
        const data = await res.json();


        if (data?.id) {
          setTracks({ ...data });
        }
      } catch (error) {
        console.error("Error fetching track:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log("useEffect running");

      try {
        const res = await fetch(`/api/tracks/d4414b20-6c1a-43e9-9ee8-716d2b3d8de2/${selectedSection?.section?.id}`)
          .then(async res => {
            if (res.status === 200) {
              const content = await res.text()
              setSectionContent(content);
              editor.commands.setContent(content);
            } else {
              setSectionContent('');
              editor.commands.setContent('');
            }
          })
      } catch (error) {
        console.error("Error fetching track:", error);
      }
    };

    fetchData();
  }, [selectedSection?.section?.id]);


  return (
    <main className="flex h-screen bg-slate-900 text-slate-100">
      <TrackSidebar
        onSelectSection={handleSelection}
        selectedSection={selectedSection}
        tracks={tracks}
      />
      <section className="flex-1 flex flex-col">
        {/* Top Action Bar */}
        <div className="flex items-center justify-between bg-gray-100 text-gray-900 px-6 py-3 border-b">
          <h2 className="text-xl font-semibold">
            {selectedSection?.section?.title || "Untitled Document"} &nbsp;
            {!section ? `( ${selectedSection?.section.id} )` : ""}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={null}
              className="px-4 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Create
            </button>
            <button
              onClick={null}
              className="px-4 py-1.5 rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition"
            >
              Edit
            </button>
            <button
              onClick={null}
              className="px-4 py-1.5 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
            >
              Save
            </button>
          </div>
        </div>

        {/* Editor Container */}
        <div className="flex-1 problem-container p-8 bg-white text-gray-900 overflow-auto space-y-4">
          <EditorContent editor={editor} />
        </div>
      </section>
    </main>
  );
}
