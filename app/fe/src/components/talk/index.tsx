import { useReactFlow } from "reactflow";
import { Drawer } from "antd";
import useStore from "~/store/use-store.ts";
import { GameNode, GameNodeData, SellItem, TALK_TOPICS, TopicsKind } from "@pelican/constants";
import { useCallback, useState } from "react";
import { createImg } from "~/utils/create-img.ts";
import { Card } from "~/components/ui/card/card.tsx";
import { useGetValues } from "~/components/custom-node/hooks/use-get-values.tsx";
import { createNode } from "~/utils/create-node.ts";

interface TalkProps {
  companionId: string;
}

interface SellItemProps {
  data: GameNodeData;
  price: number;
}

export function ItemToSell({ data, price }: SellItemProps) {
  const values = useGetValues(data);
  const { setNodes } = useReactFlow();
  const { value, removeMoney } = useStore(store => store.money);

  const handleClick = useCallback(() => {
    if (value > price) {
      removeMoney(price);
      const newNode = createNode({ position: { x: 0, y: 0 }, data });

      // TODO:  find player
      setNodes((prevNodes: GameNode[]) => [...prevNodes, newNode]);
    }
  }, [data, price, removeMoney, setNodes, value]);

  return (
    <Card
      className="small"
      img={createImg(data.type)}
      price={
        price
          ? {
              value: price,
            }
          : undefined
      }
      title={data.title}
      values={values}
      onClick={handleClick}
    />
  );
}

export function Talk({ companionId }: TalkProps) {
  const { setEdges } = useReactFlow();
  const { setTalk } = useStore(store => store.talk);
  const { getNode } = useReactFlow();
  const companion = getNode(companionId) as GameNode;
  const [talkAbout, setTalkAbout] = useState<string | SellItem[]>();
  const topics = TALK_TOPICS[companion.data.type] as Record<TopicsKind, string[]>;
  const topicKeys = Object.keys(topics);

  const handleOnClose = useCallback(() => {
    setTalk(undefined);
    setEdges(edges => edges.filter(edg => edg.target !== companionId));
  }, [companionId, setEdges, setTalk]);

  return (
    <Drawer open={true} placement="bottom" title={`Talk with ${companion?.data.title}`} onClose={handleOnClose}>
      <ul>
        {topicKeys?.map(key => (
          <li key={key} onClick={() => setTalkAbout(topics[key as TopicsKind][0])}>
            {key}
          </li>
        ))}
      </ul>

      <h3>Selling:</h3>

      <ul>{companion?.data && companion.data.sells?.nodes.map((sellItem: SellItem) => <ItemToSell data={sellItem.data} price={sellItem.price} />)}</ul>
      {talkAbout}
    </Drawer>
  );
}
