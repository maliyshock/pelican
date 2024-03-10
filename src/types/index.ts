type ObjectType = "object" | "creature";

type Socket = {
  id: string;
  name: string;
};

export type GameObject = {
  id: string;
  name: string;
  color?: string;
  ObjectType: ObjectType;
  inputs: Socket[];
  outputs: Socket[];
};

export type AutocompleteResult<T> = {
  id: string;
  name: string;
  value: T;
};
