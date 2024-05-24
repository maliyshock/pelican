import { ReactNode, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
import { modalStatus } from "~/slices/modal-status.ts";

interface UseModalProps {
  title: ReactNode;
  isOpen: boolean;
  content?: ReactNode;
  onCancel?(): void;
  onSubmit?(): void;
}

export function useModal() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    dispatch(modalStatus(open));
  }, [dispatch, open]);

  return useCallback(
    ({ content, title, onCancel, onSubmit }: UseModalProps) => {
      const handleCancel = () => {
        onCancel && onCancel();
        setOpen(false);
      };

      const handleOk = () => {
        onSubmit && onSubmit();
        setOpen(false);
      };

      return (
        open &&
        createPortal(
          <Modal open={open} title={title} onCancel={handleCancel} onOk={handleOk}>
            {content}
          </Modal>,
          document.body,
        )
      );
    },
    [open],
  );
}
