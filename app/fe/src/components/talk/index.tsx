import { useReactFlow } from "reactflow";
import { Button, Drawer } from "antd";
import useStore from "~/store/use-store.ts";
import { DIALOGS, GameNode, SellItem } from "@pelican/constants";
import { useCallback, useEffect, useState } from "react";
import { ItemToSell } from "~/components/talk/item-to-sell.tsx";
import { Choice, TopicKind } from "@pelican/constants/dist/dialogs/fox";

import "./index.css";

interface TalkProps {
  companionId: string;
}

interface TopicProps {
  id: string;
  title: string;
  onClick(): void;
}

export function Topic({ id, title, onClick }: TopicProps) {
  return (
    <li key={id}>
      <Button size="large" type="link" onClick={onClick}>
        {title}
      </Button>
    </li>
  );
}

interface PrintResponseProps {
  data: string | Choice[];
  onClick(id: TopicKind): void;
}

function Response({ data, onClick }: PrintResponseProps) {
  if (Array.isArray(data)) {
    return (
      <ul className="ul">
        {data.map(item => (
          <Topic key={item.title} id={item.id} title={item.title} onClick={() => onClick(item.id)} />
        ))}
      </ul>
    );
  }

  return <div className="talk__text">{data}</div>;
}

// TODO: improve to dialog system in the future
export function Talk({ companionId }: TalkProps) {
  const { deleteElements, getEdges } = useReactFlow();
  const { setTalk } = useStore(store => store.talk);
  const { getNode } = useReactFlow();
  const companion = getNode(companionId) as GameNode;
  const [talkAbout, setTalkAbout] = useState<TopicKind | "sell">();
  const { topics } = DIALOGS[companion.data.type];
  const [currentPage, setCurrentPage] = useState(0);
  const chat = talkAbout && talkAbout !== "sell" ? DIALOGS[companion.data.type].chat[talkAbout] : undefined;
  const isNext = talkAbout && chat && currentPage + 1 < chat.length;

  const handleOnClose = useCallback(() => {
    const edgeToDelete = getEdges().find(edg => edg.target === companionId);

    if (edgeToDelete !== undefined) {
      deleteElements({ edges: [edgeToDelete] });
    }

    setTalk(undefined);
  }, [companionId, deleteElements, getEdges, setTalk]);

  const handleBack = useCallback(() => {
    setTalkAbout(undefined);
  }, []);

  const handleGoNext = useCallback(() => {
    if (talkAbout && chat && currentPage + 1 < chat.length) {
      setCurrentPage(prev => prev + 1);
    }
  }, [chat, currentPage, talkAbout]);

  useEffect(() => {
    setCurrentPage(0);
  }, [talkAbout]);

  return (
    <Drawer open={true} placement="bottom" title={`${companion?.data.title}`} onClose={handleOnClose}>
      {/*// chat*/}
      {/*// topics*/}
      {talkAbout === undefined && (
        <ul className="ul topics-list">
          {topics?.map(topic => <Topic key={topic.title} id={topic.id} title={topic.title} onClick={() => setTalkAbout(topic.id)} />)}

          {companion.data.sells && <Topic id="sell" title={"Lets trade!"} onClick={() => setTalkAbout("sell")} />}
        </ul>
      )}

      {talkAbout !== "sell" && chat !== undefined && (
        <div className="response">
          <Response
            data={chat[currentPage].response}
            onClick={id => {
              setTalkAbout(id);
              setCurrentPage(0);
            }}
          />
          <div>
            {isNext ? (
              <Button size="large" onClick={handleGoNext}>
                Next
              </Button>
            ) : (
              <Button size="large" onClick={handleBack}>
                Back to topics
              </Button>
            )}
          </div>
        </div>
      )}

      {talkAbout === "sell" && (
        <>
          <ul className="options-list">
            {companion?.data &&
              companion.data.sells?.nodes.map((sellItem: SellItem) => <ItemToSell key={sellItem.data.title} data={sellItem.data} price={sellItem.price} />)}
          </ul>
          <Button size="large" onClick={handleBack}>
            Back to topics
          </Button>
        </>
      )}
    </Drawer>
  );
}
