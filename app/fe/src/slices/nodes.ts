// import { GameNode, RoleKind } from "@pelican/constants";
// import { SetState } from "zustand";
// import { Store } from "~/store/use-store.ts";
//
// type Nodes = {
//   all: {
//     [id: string]: GameNode;
//   };
// } & {
//   [key in RoleKind]?: {
//     [id: string]: GameNode;
//   };
// };
//
// export type NodesSlice = {
//   setNodes: (nodes: GameNode[]) => void;
//   deleteNodes: (nodes: GameNode[]) => void;
//   nodes: Nodes;
// };
//
// // export const nodesSlice = (set: SetState<Store>) => ({
// //   nodes: {
// //     all: {},
// //   },
// //   deleteNodes: (nodes: GameNode[]) =>
// //     set(state => {
// //       const newState = { ...state };
// //
// //       nodes.forEach(node => {
// //         const { id } = node;
// //         const mainRole = newState.nodes.all[id].data.roles[0];
// //         const nodesByRole = newState.nodes[mainRole];
// //
// //         delete newState.nodes.all[id];
// //         if (nodesByRole) {
// //           delete nodesByRole[id];
// //         }
// //       });
// //
// //       return newState;
// //     }),
// //   setNodes: (nodes: GameNode[]) =>
// //     set(state => {
// //       return {
// //         nodes: nodes.reduce((acc, node) => {
// //           const mainRole = node.data.roles[0];
// //
// //           return {
// //             ...acc,
// //             all: {
// //               ...acc.all,
// //               [node.id]: node,
// //             },
// //             [mainRole]: {
// //               ...acc[mainRole],
// //               [node.id]: node,
// //             },
// //           };
// //         }, state.nodes),
// //       };
// //     }),
// // });
