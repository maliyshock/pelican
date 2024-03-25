import { Handle, Position, NodeProps, useUpdateNodeInternals } from "reactflow";
import "./custom-node.css";
import { GameObject } from "~/types";
import { useEffect } from "react";
import { ArrowRightFromLine, ArrowRightToLine, Heart, Sword } from "lucide-react";
import { IconValue } from "~/components/icon-value/icon-value.tsx";

export default function CustomNode({ id, data, isConnectable }: NodeProps<GameObject>) {
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, updateNodeInternals]);

  return (
    <div className="node-wrapper">
      {data.name && (
        <header className="node__header">
          <h3>{data.name}</h3>
        </header>
      )}
      {data.img && (
        <div className="node__body" style={{ backgroundColor: data.color }}>
          <img className="img" alt="pelican" src="/assets/pelican.jpg" />
        </div>
      )}
      {(data.dmg || data.health) && (
        <footer className="node__footer">
          {data.dmg && <IconValue value={1} right={<Sword className="silver" strokeWidth={2} />} />}

          {data.health && <IconValue value={10} right={<Heart className="red" strokeWidth={2} />} />}
        </footer>
      )}

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
    </div>
  );
}
