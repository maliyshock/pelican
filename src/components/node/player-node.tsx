import { Handle, Position, NodeProps, useUpdateNodeInternals } from "reactflow";
import "./node.css";
import { GameObject } from "../../types";
import { useEffect, useRef, useState } from "react";
import { useCenterCamera } from "../../hooks/useCenterCamera.ts";
import { ArrowRightFromLine, ArrowRightToLine } from "lucide-react";
import { Footer } from "./footer.tsx";

export default function PlayerNode({ id, data, isConnectable, xPos, yPos }: NodeProps<GameObject>) {
  const updateNodeInternals = useUpdateNodeInternals();
  const ref = useRef<HTMLDivElement | null>(null);
  const centerCamera = useCenterCamera({ ref });
  const [cameraIsCentered, setCameraIsCentered] = useState(false);

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, updateNodeInternals]);

  useEffect(() => {
    if (centerCamera && !cameraIsCentered) {
      centerCamera(xPos, yPos);
      setCameraIsCentered(true);
    }
  }, [cameraIsCentered, centerCamera, xPos, yPos]);

  return (
    <div className="node-wrapper" ref={ref}>
      {/*<header className="node__header">*/}
      {/*  <h3>{data.name}</h3>*/}
      {/*</header>*/}
      <div className="node__body" style={{ backgroundColor: data.color }}>
        <img className="img" alt="pelican" src="/public/assets/pelican.jpg" />
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
