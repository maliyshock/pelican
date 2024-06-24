import { TypeKind } from "~/types/build/type-kind";

export const TOPICS = ["about-you"] as const;
export type TopicsKind = (typeof TOPICS)[number];

// type TalkTopics = Record<Partial<TypeKind>, Record<TopicsKind, string[]>>;

type TalkTopics = {
  [k in TypeKind]?: {
    [t in TopicsKind]?: string[];
  };
};

export const TALK_TOPICS: TalkTopics = {
  fox: {
    "about-you": ["blablabla"],
  },
};
