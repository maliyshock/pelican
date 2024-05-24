import { ACORN, BASIC, FOOD } from "~/constants/dictionary.ts";
import { createSocket } from "~/utils/create-socket.ts";
import { GameNodeData } from "~/types";

export const ACORN_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Acorn",
  root: ACORN,
  type: ACORN,
  roles: [FOOD],
  price: 2,
};
