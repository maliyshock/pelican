import React from "react";

type ObjectType = "player" | "object" | "creature";

type Socket = {
  id: string;
  name: string;
  type: "input | output";
};

export type GameObject = {
  id: string;
  name?: string;
  color?: string;
  img?: React.ReactNode;
  objectType: ObjectType;
  inputs?: Socket[];
  outputs?: Socket[];
  dmg?: number;
  health?: number;
};

export type AutocompleteResult<T> = {
  id: string;
  name: string;
  value: T;
};
