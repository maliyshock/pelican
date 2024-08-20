import { Handle, Position, useConnection } from "@xyflow/react";
import { ArrowRightFromLine, ArrowRightToLine } from "lucide-react";
import { Socket } from "@pelican/constants";
import useStore from "~/store/use-store.ts";

interface SocketsProps {
  type: "target" | "source";
  isTarget?: boolean;
  sockets: Socket[];
  isConnectable?: boolean;
  position: Position;
}

export function Sockets({ type, isTarget, sockets, isConnectable, position }: SocketsProps) {
  const { cmdIsPressed: isCmd } = useStore(state => state.cmd);
  const isInput = type === "target";

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
        <Handle
          key="source-catcher"
          className={`handle-overlay handle-reset ${isCmd ? "" : "transparent"}`}
          id="source-catcher"
          position={position}
          type="source"
        />
      )}

      <div className={`card__connectors ${isInput ? "card__inputs" : "card__outputs"}`}>
        {sockets?.map((socket, index) => (
          <Handle
            key={`${type}-${index}`}
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
