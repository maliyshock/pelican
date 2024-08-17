import { useEffect } from "react";
import { changeNodeValueBy } from "~/utils/change-node-value-by.ts";
import useStore from "~/store/use-store.ts";
import { useReactFlow } from "@xyflow/react";
import { Digestion, GameNode } from "@pelican/constants";
import { useGetCurrentMaxSatiety } from "~/components/custom-node/hooks/use-get-current-max-satiety.ts";

interface HungerManager {
  id: string;
  digestion?: Digestion;
}

export function useHungerManager({ id, digestion }: HungerManager) {
  const play = useStore(store => store.play);
  const { setNodes } = useReactFlow();
  const maxSatiety = useGetCurrentMaxSatiety(digestion);

  useEffect(() => {
    if (digestion) {
      const { hungerSpeed } = digestion;

      const timer = setInterval(() => {
        if (play) {
          setNodes((prevNodes: GameNode[]) =>
            changeNodeValueBy({
              nodes: prevNodes,
              ids: [id],
              changes: [{ keys: ["data", "profile", "digestion", "satiety"], value: -1 }],
            }),
          );
        }
      }, hungerSpeed);

      return () => clearInterval(timer);
    }
  }, [digestion, id, maxSatiety, play, setNodes]);

  return {
    currentMaxSatiety: maxSatiety,
  };
}
