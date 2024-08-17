import useStore from "~/store/use-store.ts";
import { useReactFlow } from "@xyflow/react";
import { useEffect } from "react";
import { Fire, GameNode } from "@pelican/constants";
import { changeNodeValueBy } from "~/utils/change-node-value-by.ts";

interface FuelManager {
  fire?: Fire;
  id: string;
  die(): void;
}

export function useFuelManager({ fire, id, die }: FuelManager) {
  const play = useStore(store => store.play);
  const { setNodes } = useReactFlow();

  useEffect(() => {
    if (fire) {
      const { speed, amount } = fire;

      const timer = setInterval(() => {
        if (play) {
          if (amount - 1 <= 0) {
            die();
          } else {
            setNodes((prevNodes: GameNode[]) =>
              changeNodeValueBy({
                nodes: prevNodes,
                ids: [id],
                changes: [{ keys: ["data", "fire", "amount"], value: -1 }],
              }),
            );
          }
        }
      }, speed);

      return () => clearInterval(timer);
    }
  }, [die, fire, id, play, setNodes]);
}
