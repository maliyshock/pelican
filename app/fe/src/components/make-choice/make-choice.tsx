import { useCallback, useEffect, useState } from "react";
import { Modal } from "antd";
import { Option } from "./option.tsx";
import "./make-choice.css";
import { createNode } from "~/utils/create-node.ts";
import { useReactFlow } from "reactflow";
import useStore from "~/store/use-store.ts";
import { GameNode } from "@pelican/constants";

export function MakeChoice() {
  const { getNode } = useReactFlow();
  const { items, actor, setItems } = useStore(store => store.choice);
  const { setIsOpen } = useStore(store => store.modal);
  const [selected, setSelected] = useState<number[]>([]);
  // actor, not player
  const limit = undefined; // get limit here from actor
  const { addNodes } = useReactFlow();

  const handleSelection = useCallback(
    (index: number) => {
      const actorNode: GameNode | undefined = actor ? getNode(actor) : undefined;

      if (actorNode?.data.profile && selected.length < actorNode.data.profile.explore.limit) {
        setSelected(prev => [...prev, index]);
      }
    },
    [actor, getNode, selected.length],
  );

  const handleDeSelection = useCallback((index: number) => setSelected(prev => prev.filter(ind => ind !== index)), []);

  const handleCancel = () => {
    setItems({ items: [], actor: undefined });
    setIsOpen(false);
  };

  const handleOk = useCallback(() => {
    setIsOpen(false);
    setItems({ items: [], actor: undefined });
    // TODO: we need to know position of a player
    // we need to have an access to character position by id
    const newNodes = selected.map(ind => createNode({ data: items[ind], position: { x: 0, y: 0, strict: false } }));

    addNodes(newNodes);
  }, [addNodes, items, selected, setIsOpen, setItems]);

  useEffect(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return (
    <Modal
      closable={false}
      maskClosable={false}
      okButtonProps={{ disabled: selected.length === 0 }}
      open={true}
      width={620}
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <div>
        Make your choice
        <ul className="options-list">
          {items.map((option, index) => (
            <Option
              key={`${option}_${index}`}
              active={selected.includes(index)}
              index={index}
              limitIsReached={selected.length === limit}
              option={option}
              onDeSelect={handleDeSelection}
              onSelect={handleSelection}
            />
          ))}
        </ul>
      </div>
    </Modal>
  );
}
