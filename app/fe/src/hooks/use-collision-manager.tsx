import { useEffect } from "react";
import { NodeAddChange, NodeChange, NodeDimensionChange, NodePositionChange, useNodesInitialized, useReactFlow } from "@xyflow/react";
import { GameNode } from "@pelican/constants";
import useStore from "~/store/use-store.ts";

type Changes = NodeDimensionChange | NodePositionChange | NodeAddChange;

const COLLISION_THRESHOLD = 1; // минимальное расстояние между нодами
const MIN_TRANSITION_TIME = 300; // минимальное время перехода в мс
const MAX_TRANSITION_TIME = 1000; // максимальное время перехода в мс

const calculateTransitionTime = (magnitude: number, cardWidth: number, cardHeight: number) => {
  const MAX_MAGNITUDE = Math.sqrt(Math.pow(cardWidth, 2) + Math.pow(cardHeight, 2)) / 2;
  const normalizedMagnitude = Math.min(magnitude, MAX_MAGNITUDE) / MAX_MAGNITUDE;
  return MIN_TRANSITION_TIME + normalizedMagnitude * (MAX_TRANSITION_TIME - MIN_TRANSITION_TIME);
};

export function useCollisionManager() {
  const { getIntersectingNodes, getNode, setNodes } = useReactFlow();
  const { changes } = useStore(state => state.nodeChanges);
  const nodesInitialized = useNodesInitialized();

  useEffect(() => {
    if (nodesInitialized) {
      changes
        .filter(
          (change: NodeChange<GameNode>) => change.type === "position" || change.type === "dimensions" || change.type === "add" || change.type === "replace",
        )
        .forEach((change: NodeChange<GameNode>) => {
          const changedNode = change as Changes;
          const node = changedNode.type === "add" ? changedNode.item : getNode(changedNode.id);

          if (node) {
            const intersections = getIntersectingNodes(node);
            if (intersections.length > 0) {
              intersections.forEach(intersection => {
                const SCALE = node.dragging ? 1.1 : 1;
                const iH = intersection.measured?.height * SCALE;
                const iW = intersection.measured?.width * SCALE;
                const nH = node.measured?.height * SCALE;
                const nW = node.measured?.width * SCALE;

                const overlapX = Math.min(node.position.x + nW, intersection.position.x + iW) - Math.max(node.position.x, intersection.position.x);
                const overlapY = Math.min(node.position.y + nH, intersection.position.y + iH) - Math.max(node.position.y, intersection.position.y);

                let xMagnitude = 0;
                let yMagnitude = 0;
                let nx = 0;
                let ny = 0;

                if (overlapX > overlapY) {
                  yMagnitude = overlapY + COLLISION_THRESHOLD;
                  ny = node.position.y < intersection.position.y ? -1 : 1;
                } else {
                  xMagnitude = overlapX + COLLISION_THRESHOLD;
                  nx = node.position.x < intersection.position.x ? -1 : 1;
                }

                const totalMagnitude = Math.sqrt(xMagnitude * xMagnitude + yMagnitude * yMagnitude);
                const transitionTime = calculateTransitionTime(totalMagnitude, nW, nH);

                setNodes((prevNodes: GameNode[]) => {
                  return prevNodes.map(nd => {
                    if (nd.id === node.id && !node.dragging) {
                      return {
                        ...nd,
                        position: {
                          x: nd.position.x + (xMagnitude * nx) / 2,
                          y: nd.position.y + (yMagnitude * ny) / 2,
                        },
                        style: {
                          ...nd.style,
                          transition: `transform ${transitionTime}ms ease-out`,
                        },
                      };
                    }

                    if (nd.id === intersection.id && !intersection.dragging) {
                      return {
                        ...nd,
                        position: {
                          x: nd.position.x - (xMagnitude * nx) / 2,
                          y: nd.position.y - (yMagnitude * ny) / 2,
                        },
                        style: {
                          ...nd.style,
                          transition: `transform ${transitionTime}ms ease-out`,
                        },
                      };
                    }

                    return nd;
                  });
                });
              });
            }
          }
        });
    }
  }, [changes, getIntersectingNodes, getNode, nodesInitialized, setNodes]);
}
