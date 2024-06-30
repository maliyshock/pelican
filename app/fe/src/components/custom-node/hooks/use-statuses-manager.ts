import { GameNode, GameNodeData, Statuses } from "@pelican/constants";
import { useEffect } from "react";
import { changeNodeValueBy } from "~/utils/change-node-value-by.ts";
import useStore from "~/store/use-store.ts";
import { useReactFlow } from "reactflow";

interface StatusesManager {
  data: GameNodeData;
  statuses: Statuses;
  id: string;
}
export function useStatusesManager({ data, statuses, id }: StatusesManager) {
  const play = useStore(store => store.play);
  const { setNodes } = useReactFlow();

  useEffect(() => {
    const timers: { [key: string]: NodeJS.Timeout } = {};

    if (statuses && statuses["health-regen"] !== undefined && statuses["health-regen"] > 0) {
      timers["health-regen"] = setInterval(() => {
        if (play) {
          setNodes((prevNodes: GameNode[]) =>
            changeNodeValueBy({
              nodes: prevNodes,
              ids: [id],
              changes: [
                { keys: ["data", "health"], value: 1 },
                { keys: ["data", "statuses", "health-regen"], value: -1 },
              ],
            }),
          );
        }
      }, data.regenSpeed);
    }

    return () => {
      for (const time in timers) {
        clearInterval(timers[time]);
      }
    };
  }, [data.regenSpeed, id, play, setNodes, statuses]);
}
