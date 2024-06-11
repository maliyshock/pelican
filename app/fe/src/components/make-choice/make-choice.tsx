import { useCallback, useEffect, useState } from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { modalStatus } from "~/slices/modal-status.ts";
import { RootState } from "~/store";
import { Option } from "./option.tsx";
import { clear } from "~/slices/items-to-choose.ts";
import "./make-choice.css";
import { createNode } from "~/utils/create-node.ts";
import { useReactFlow } from "reactflow";

export function MakeChoice() {
  const chooseFrom = useSelector((state: RootState) => state.itemsToChoose.items);
  const [selected, setSelected] = useState<number[]>([]);
  const limit = useSelector((state: RootState) => state.player.explore.limit);
  const dispatch = useDispatch();
  const { addNodes } = useReactFlow();

  const handleSelection = useCallback(
    (index: number) => {
      if (selected.length < limit) {
        setSelected(prev => [...prev, index]);
      }
    },
    [limit, selected.length],
  );

  const handleDeSelection = useCallback((index: number) => setSelected(prev => prev.filter(ind => ind !== index)), []);

  const handleCancel = () => {
    dispatch(clear());
    dispatch(modalStatus(false));
  };

  const handleOk = useCallback(() => {
    dispatch(modalStatus(false));
    dispatch(clear());
    // TODO: we need to know position of a player
    // we need to have an access to character position by id
    const newNodes = selected.map(ind => createNode({ data: chooseFrom[ind], position: { x: 0, y: 0, strict: false } }));

    addNodes(newNodes);
  }, [addNodes, chooseFrom, dispatch, selected]);

  useEffect(() => {
    dispatch(modalStatus(true));
  }, [dispatch]);

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
          {chooseFrom.map((option, index) => (
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
