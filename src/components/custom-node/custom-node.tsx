import { Handle, Position, NodeProps, useUpdateNodeInternals } from "reactflow";
import "./custom-node.css";
import { GameObject } from "~/types";
import { useEffect } from "react";
import { ArrowRightFromLine, ArrowRightToLine } from "lucide-react";
import { motion } from "framer-motion";
import { useGetAction } from "~/hooks/use-get-action.ts";
import { Timer } from "~/components/timer/timer.tsx";

export default function CustomNode(props: NodeProps<GameObject>) {
  const { id, data, isConnectable, dragging } = props;
  const updateNodeInternals = useUpdateNodeInternals();
  const { callback, timer, actionName } = useGetAction({ node: props });
  const isTimer = callback && timer;

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, updateNodeInternals]);

  return (
    <motion.div className={`node-wrapper ${dragging ? "dragging" : ""} ${data.grabbable ? "grabbable" : ""}`} whileHover={{ scale: 1.1 }}>
      <motion.div
        className="node__inner"
        initial={{ boxShadow: "0 0px 12px rgba(0, 0, 0, 0.06)" }}
        whileHover={{ boxShadow: "0 16px 12px rgba(0, 0, 0, 0.03)", outline: "4px solid var(--blue)" }}
      >
        {isTimer && <Timer time={timer} callback={callback} label={actionName} />}
        {data.name && (
          <header className="node__header">
            <h3>{data.name}</h3>
          </header>
        )}
        {data.img && (
          <div className="node__body" style={{ backgroundColor: data.color }}>
            <img className="img" alt={data.img.alt} src={data.img.src} />
          </div>
        )}

        {data.dmg && (
          <div className="node__value-container node__dmg">
            <div className="node__value">{data.dmg}</div>
          </div>
        )}

        {data.health && (
          <div className="node__value-container node__health">
            <div className="node__value">{data.health}</div>
          </div>
        )}
      </motion.div>

      <div className="node__connectors node__outputs">
        {data.outputs?.map((_output, index) => (
          <Handle
            className="handle"
            type="source"
            position={Position.Right}
            isConnectable={isConnectable}
            key={`handle-output-${index}`}
            id={`handle-output-${index}`}
          >
            <ArrowRightFromLine strokeWidth={3} width="100%" height="100%" />
          </Handle>
        ))}
      </div>
      <div className="node__connectors node__inputs">
        {data.inputs?.map((_input, index) => (
          <Handle
            className="handle input"
            type="target"
            position={Position.Left}
            isConnectable={isConnectable}
            key={`handle-input-${index}`}
            id={`handle-input-${index}`}
          >
            <ArrowRightToLine strokeWidth={3} width="100%" height="100%" />
          </Handle>
        ))}
      </div>
    </motion.div>
  );
}
