import { useCallback, useEffect, useState } from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { modalStatus } from "~/slices/modal-status.ts";
import { RootState } from "~/store";
import { Option } from "./option.tsx";
import { clear } from "~/slices/items-to-choose.ts";
import "./make-choice.css";

export function MakeChoice() {
  const [selected, setSelected] = useState<number[]>([]);
  const chooseFrom = useSelector((state: RootState) => state.itemsToChoose.items);
  const limit = useSelector((state: RootState) => state.player.explore.limit);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(chooseFrom.length > 0);

  const handleSelection = useCallback(
    (index: number) => {
      if (selected.length < limit) {
        setSelected(prev => [...prev, index]);
      }
    },
    [limit, selected.length],
  );

  const handleDeSelection = useCallback((index: number) => setSelected(prev => prev.filter(id => id !== index)), []);

  const handleCancel = () => {
    dispatch(clear());
    setOpen(false);
  };

  const handleOk = useCallback(() => {
    if (selected.length > 0) {
      setOpen(false);
    }
  }, [selected.length]);

  useEffect(() => {
    if (chooseFrom.length > 0) {
      setOpen(true);
    }
  }, [chooseFrom.length]);

  useEffect(() => {
    dispatch(modalStatus(open));
  }, [dispatch, open]);

  return (
    <Modal
      closable={false}
      destroyOnClose={true}
      maskClosable={false}
      okButtonProps={{ disabled: selected.length === 0 }}
      open={open}
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
