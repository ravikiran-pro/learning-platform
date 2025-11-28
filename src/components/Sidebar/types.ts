export type Section = {
  id: string;
  title: string;
  slug: string;
};

export type Chapter = {
  id: string;
  title: string;
  sections: Section[];
};

export type Module = {
  id: string;
  title: string;
  chapters: Chapter[];
};

export type Track = {
  id: string;
  title: string;
  modules: Module[];
};

export type SelectedSection = {
  module: Pick<Module, "id" | "title">;
  chapter: Pick<Chapter, "id" | "title">;
  section: Pick<Section, "id" | "title">;
};
