import { useReactFlow } from "reactflow";
import { Button, Drawer } from "antd";
import useStore from "~/store/use-store.ts";
import { GameNode, SellItem, TALK_TOPICS, TopicsKind } from "@pelican/constants";
import { useCallback, useState } from "react";
import { ItemToSell } from "~/components/talk/item-to-sell.tsx";

interface TalkProps {
  companionId: string;
}

// TODO: improve to dialog system in the future
export function Talk({ companionId }: TalkProps) {
  const { deleteElements, getEdges } = useReactFlow();
  const { setTalk } = useStore(store => store.talk);
  const { getNode } = useReactFlow();
  const companion = getNode(companionId) as GameNode;
  const [talkAbout, setTalkAbout] = useState<string>();
  const topics = TALK_TOPICS[companion.data.type] as Record<TopicsKind, string[]>;
  const topicKeys = companion.data.sells ? [...Object.keys(topics), "sell"] : Object.keys(topics);

  const handleOnClose = useCallback(() => {
    const edgeToDelete = getEdges().find(edg => edg.target === companionId);

    if (edgeToDelete !== undefined) {
      deleteElements({ edges: [edgeToDelete] });
    }

    setTalk(undefined);
  }, [companionId, deleteElements, getEdges, setTalk]);

  return (
    <Drawer open={true} placement="bottom" title={`Talk with ${companion?.data.title}`} onClose={handleOnClose}>
      <ul>
        {topicKeys?.map(key => (
          <li key={key}>
            <Button type="link" onClick={() => setTalkAbout(key)}>
              {key}
            </Button>
          </li>
        ))}
      </ul>

      {talkAbout !== "sell" ? (
        talkAbout
      ) : (
        <>
          <h3>Items for sale:</h3>
          <ul className="options-list">
            {companion?.data &&
              companion.data.sells?.nodes.map((sellItem: SellItem) => <ItemToSell key={sellItem.data.title} data={sellItem.data} price={sellItem.price} />)}
          </ul>
        </>
      )}
    </Drawer>
  );
}
