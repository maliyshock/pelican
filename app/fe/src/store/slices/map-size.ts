import { SetState } from "zustand";
import { Store } from "~/store/use-store.ts";
import { MAP_SIZE_HEIGHT, MAP_SIZE_WIDTH } from "~/constants";

type MapSize = [number, number][];
type Size = {
  width: number;
  height: number;
};

export type MapSizeSlice = {
  size: MapSize;
  setMapSize: (size: Size) => void;
};

const initialState: MapSize = [
  [-MAP_SIZE_WIDTH, -MAP_SIZE_HEIGHT],
  [MAP_SIZE_WIDTH, MAP_SIZE_HEIGHT],
];

export const mapSizeSlice = (set: SetState<Store>) => ({
  size: initialState,
  setMapSize: (size: Size) =>
    set(state => ({
      mapSize: {
        ...state.mapSize,
        size: [
          [-size.width, -size.height],
          [size.width, size.height],
        ],
      },
    })),
});
