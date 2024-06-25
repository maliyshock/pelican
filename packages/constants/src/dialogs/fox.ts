import { PlayerKind } from "~/types/build/player";
import { FOX } from "~/nodes/characters/characters";
import { PELICAN } from "~/nodes/player/pelican";

export const COMPANIONS = [FOX.type] as const;
export const EMOTIONS = ["default", "happy", "sad", "neutral", "puzzled"] as const;
export const INIT_TOPICS = ["about-you", "about-this-place", "about-me", "what-to-do"] as const;

export type CompanionKind = (typeof COMPANIONS)[number];
export type TopicKind = (typeof INIT_TOPICS)[number];
export type EmotionKind = (typeof EMOTIONS)[number];

export type Choice = {
  id: TopicKind;
  title: string;
};

export type Chat = {
  [t in TopicKind]?: {
    speaker: PlayerKind | CompanionKind;
    response: string | Choice[];
    emotion?: EmotionKind;
  }[];
};

export type DialogsByCompanion = {
  companion: CompanionKind;
  topics: Choice[];
  chat: Chat;
};

export const FOX_DIALOGS: DialogsByCompanion = {
  companion: FOX.type,
  topics: [
    { id: "about-you", title: "Tell me about yourself" },
    { id: "about-this-place", title: "Where we are?" },
    { id: "about-me", title: "What do you know about me?" },
    { id: "what-to-do", title: "What should I do?" },
  ],
  chat: {
    "about-you": [
      {
        speaker: FOX.type,
        response:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate deserunt, dolore eaque earum et facilis laudantium libero maxime molestias nam omnis quam quos rem reprehenderit, sapiente vero vitae voluptate voluptatem.",
      },
      {
        speaker: PELICAN.type,
        response:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consectetur ipsum magnam minus nihil nobis, quam quia sequi similique veniam. Autem consectetur dolorum esse impedit, itaque laboriosam nobis voluptatum? Voluptas.",
      },
      {
        speaker: FOX.type,
        response: [
          {
            id: "about-you",
            title: "Tell me about yourself... again",
          },
        ],
      },
    ],
    "about-this-place": [
      {
        speaker: FOX.type,
        response:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate deserunt, dolore eaque earum et facilis laudantium libero maxime molestias nam omnis quam quos rem reprehenderit, sapiente vero vitae voluptate voluptatem.",
      },
      {
        speaker: PELICAN.type,
        response:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consectetur ipsum magnam minus nihil nobis, quam quia sequi similique veniam. Autem consectetur dolorum esse impedit, itaque laboriosam nobis voluptatum? Voluptas.",
      },
      {
        speaker: FOX.type,
        response: [
          {
            id: "about-you",
            title: "Tell me about yourself... again",
          },
        ],
      },
    ],
    "about-me": [
      {
        speaker: FOX.type,
        response:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate deserunt, dolore eaque earum et facilis laudantium libero maxime molestias nam omnis quam quos rem reprehenderit, sapiente vero vitae voluptate voluptatem.",
      },
      {
        speaker: PELICAN.type,
        response:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consectetur ipsum magnam minus nihil nobis, quam quia sequi similique veniam. Autem consectetur dolorum esse impedit, itaque laboriosam nobis voluptatum? Voluptas.",
      },
      {
        speaker: FOX.type,
        response: [
          {
            id: "about-you",
            title: "Tell me about yourself... again",
          },
        ],
      },
    ],
    "what-to-do": [
      {
        speaker: FOX.type,
        response:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate deserunt, dolore eaque earum et facilis laudantium libero maxime molestias nam omnis quam quos rem reprehenderit, sapiente vero vitae voluptate voluptatem.",
      },
      {
        speaker: PELICAN.type,
        response:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consectetur ipsum magnam minus nihil nobis, quam quia sequi similique veniam. Autem consectetur dolorum esse impedit, itaque laboriosam nobis voluptatum? Voluptas.",
      },
      {
        speaker: FOX.type,
        response: [
          {
            id: "about-you",
            title: "Tell me about yourself... again",
          },
        ],
      },
    ],
    // "something-else": {},
  },
};
