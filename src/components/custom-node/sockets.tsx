import { Handle, Position } from "reactflow";
import { ArrowRightFromLine, ArrowRightToLine } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import { Socket } from "~/types";

interface SocketsProps {
  type: "target" | "source";
  isTarget: boolean;
  sockets: Socket[];
  isConnectable: boolean;
  position: Position;
}

export function Sockets({ type, isTarget, sockets, isConnectable, position }: SocketsProps) {
  const isCmd = useSelector((state: RootState) => state.cmd);

  return (
    <>
      {isTarget && type === "target" && (
        <Handle
          key="target-catcher"
          className={`handle-overlay handle-reset ${isCmd ? "" : "transparent"} ${isTarget ? "catcher" : ""}`}
          id="target-catcher"
          position={position}
          type="target"
        />
      )}

      {type === "source" && (
        <Handle
          key="source-catcher"
          className={`handle-overlay handle-reset ${isCmd ? "" : "transparent"}`}
          id="source-catcher"
          position={position}
          type="source"
        />
      )}

      <div className={`node__connectors ${type === "target" ? "node__inputs" : "node__outputs"}`}>
        {sockets?.map((_input, index) => (
          <Handle
            key={`${type}-${index}`}
            className="handle input handle-reset"
            id={`${type}-${index}`}
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
