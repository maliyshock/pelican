import { Handle, Position, NodeProps, useUpdateNodeInternals } from "reactflow";
import "./node.css";
import { GameObject } from "~/types";
import { useEffect } from "react";
import { ArrowRightFromLine, ArrowRightToLine } from "lucide-react";
import { Footer } from "./footer.tsx";

export default function PlayerNode({ id, data, isConnectable }: NodeProps<GameObject>) {
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, updateNodeInternals]);

  return (
    <div className="node-wrapper">
      {/*<header className="node__header">*/}
      {/*  <h3>{data.name}</h3>*/}
      {/*</header>*/}
      <div className="node__body" style={{ backgroundColor: data.color }}>
        <img className="img" alt="pelican" src="/assets/pelican.jpg" />
      </div>
      <Footer />
      <div className="node__connectors node__outputs">
        {data.outputs.map((output, index) => (
          <Handle
            className="handle"
            type="target"
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
        {data.inputs.map((input, index) => (
          <Handle
            className="handle input"
            type="source"
            position={Position.Left}
            isConnectable={isConnectable}
            key={`handle-input-${index}`}
            id={`handle-input-${index}`}
          >
            <ArrowRightToLine strokeWidth={3} width="100%" height="100%" />
          </Handle>
        ))}
      </div>
    </div>
  );
}
