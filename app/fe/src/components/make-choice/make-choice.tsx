import { useCallback, useState } from "react";
import { Modal } from "antd";
import "./make-choice.css";
import { createNode } from "~/utils/create-node.ts";
import { useReactFlow } from "@xyflow/react";
import useStore from "~/store/use-store.ts";
import { GameNode, GameNodeData } from "@pelican/constants";
import { OptionsList } from "~/components/ui/options-list";

export function MakeChoice() {
  const { getNode } = useReactFlow();
  const { items, actor, setItems } = useStore(store => store.choice);
  const actorNode: GameNode | undefined = actor ? getNode(actor) : undefined;
  const [selected, setSelected] = useState<GameNodeData[]>([]);
  const limit = actorNode?.data.profile?.explore.limit; // get limit here from actor
  const { addNodes } = useReactFlow();

  const handleCancel = () => {
    setItems({ items: [], actor: undefined });
  };

  const handleOk = useCallback(() => {
    setItems({ items: [], actor: undefined });
    // TODO: we need to know position of a player
    // we need to have an access to character position by id
    const newNodes = selected.map(item => createNode({ data: item, position: { x: 0, y: 0, strict: false } }));

    addNodes(newNodes);
  }, [addNodes, selected, setItems]);

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
      <OptionsList items={items} limit={limit} title="Make your choice" onSelect={selectedItems => setSelected(selectedItems)} />
    </Modal>
  );
}
