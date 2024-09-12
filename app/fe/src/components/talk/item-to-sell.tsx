import { useGetValues } from "~/components/custom-node/hooks/use-get-values.tsx";
import { useReactFlow } from "@xyflow/react";
import useStore from "~/store/use-store.ts";
import { useCallback } from "react";
import { createNode } from "~/utils/create-node.ts";
import { GameNode, GameNodeData } from "@pelican/constants";
import { Card } from "~/components/ui/card/card.tsx";
import { createImg } from "@pelican/utils";

interface SellItemProps {
  data: GameNodeData;
  price: number;
}

export function ItemToSell({ data, price }: SellItemProps) {
  const values = useGetValues({ ...data, price });
  const { setNodes } = useReactFlow();
  const { value, removeMoney } = useStore(store => store.money);

  const handleClick = useCallback(() => {
    if (value >= price) {
      removeMoney(price);
      const newNode = createNode({ type: "node", position: { x: 0, y: 0 }, data });

      // TODO:  find player
      setNodes((prevNodes: GameNode[]) => [...prevNodes, newNode]);
    }
  }, [data, price, removeMoney, setNodes, value]);

  return <Card className="micro" disabled={value < price} img={createImg(data.type)} title={data.title} values={values} onClick={handleClick} />;
}
