import { Handle, Position } from "@xyflow/react";
import { ArrowRightFromLine, ArrowRightToLine } from "lucide-react";
import { Socket } from "@pelican/constants";
import useStore from "~/store/use-store.ts";
import { MouseEvent as ReactMouseEvent, useCallback, useRef } from "react";

interface SocketsProps {
  type: "target" | "source";
  isTarget?: boolean;
  sockets: Socket[];
  isConnectable?: boolean;
  position: Position;
}

export function Sockets({ type, isTarget, sockets, isConnectable, position }: SocketsProps) {
  const refs = useRef<HTMLDivElement[]>([]);

  const { cmdIsPressed: isCmd } = useStore(state => state.cmd);
  const isInput = type === "target";
  const handleMouseDown = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (refs.current.length > 0) {
      // TODO: fix hardcode later get available
      refs.current[0].dispatchEvent(new MouseEvent("mousedown", e.nativeEvent));
    }
  }, []);

  function setRef(index) {
    return el => {
      refs.current[index] = el;
    };
  }

  console.log("sockets", sockets);

  return (
    <>
      {isTarget && isInput && isConnectable && (
        <Handle
          key="target-catcher"
          className={`handle-overlay handle-reset ${isCmd ? "" : "transparent"} ${isTarget ? "catcher" : ""}`}
          id="target-catcher"
          position={position}
          type="target"
        />
      )}

      {!isInput && isConnectable && (
        <div
          key="source-catcher"
          className={`handle-overlay nodrag nopan source handle-reset ${isCmd ? "" : "transparent"}`}
          id="source-catcher"
          onMouseDown={e => handleMouseDown(e)}
        />
      )}

      <div className={`card__connectors ${isInput ? "card__inputs" : "card__outputs"}`}>
        {sockets?.map((socket, index) => (
          <Handle
            key={`${type}-${index}`}
            ref={setRef(index)}
            className={`handle ${isInput ? "input" : ""} handle-reset`}
            id={socket.id.toString()}
            isConnectable={isConnectable}
            position={position}
            type={type}
          >
            {type === "target" && <ArrowRightToLine height="100%" strokeWidth={3} width="100%" />}
            {type === "source" && <ArrowRightFromLine height="100%" strokeWidth={3} width="100%" />}
          </Handle>
        ))}
      </div>
    </>
  );
}
