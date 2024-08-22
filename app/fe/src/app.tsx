import "./css/app.css";
import { useCallback, useEffect, useState } from "react";
import { Background, Controls, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CustomNode from "./components/custom-node";
import { useCenterCamera } from "./hooks/use-center-camera.ts";
import CustomEdge from "./components/custom-edge";
import { useEdges } from "./hooks/use-edges.ts";
import { Header } from "./components/ui/header/header.tsx";
import { useKeyListener } from "./hooks/use-key-listener.ts";
import { useOnConnect } from "./hooks/use-on-connect.ts";
import { useNodes } from "./hooks/use-nodes.ts";
import { useCraftingManager } from "./hooks/use-crafting-manager.ts";
import useStore from "~/store/use-store.ts";
import { MakeChoice } from "~/components/make-choice/make-choice.tsx";
import { INIT_NODES } from "~/constants";
import { Talk } from "~/components/talk";
import { ConnectionLine } from "~/components/connection-line/connection-line.tsx";

const nodeTypes = { node: CustomNode };
const edgeTypes = {
  "custom-edge": CustomEdge,
};

function App() {
  const [nodes, , onNodesChange] = useNodesState(INIT_NODES);
  const { items } = useStore(state => state.choice);
  const setScreenSize = useStore(state => state.setScreenSize);
  const screenSize = useStore(state => state.screenSize);
  const { companionId } = useStore(state => state.talk);
  const { setIsOpen } = useStore(state => state.modal);
  const { handleOnNodesDelete } = useNodes();
  const [edges, , onEdgesChange] = useEdgesState([]);
  const { isValidConnection, onReconnect, onReconnectStart, onReconnectEnd, handleOnEdgesDelete } = useEdges();
  const [cameraIsCentered, setCameraIsCentered] = useState(false);
  const onConnect = useOnConnect();
  const centerCamera = useCenterCamera();

  useKeyListener();
  useCraftingManager();

  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        const screenSize = node.getBoundingClientRect();

        if (screenSize?.width && screenSize?.height) {
          setScreenSize({ width: screenSize.width, height: screenSize.height });
        }
      }
    },
    [setScreenSize],
  );

  useEffect(() => {
    if (nodes.length > 0 && !cameraIsCentered) {
      // get first player
      const player = nodes.find(node => node.id.includes("pelican"))!;

      if (player) {
        centerCamera(player.position.x, player.position.y, screenSize);
        setCameraIsCentered(true);
      }
    }
  }, [centerCamera, nodes, cameraIsCentered, screenSize]);

  useEffect(() => {
    //TODO: we might need to rework it in the future
    setIsOpen(items.length > 0 || companionId !== undefined);
  }, [companionId, items.length, setIsOpen]);

  return (
    <div className="app">
      {companionId !== undefined && <Talk companionId={companionId} />}
      {items.length > 0 && <MakeChoice />}
      <div className="node-sandbox">
        <Header />
        {/*<CenterCameraButton />*/}
        <svg style={{ position: "absolute", top: 0, left: 0 }}>
          <defs>
            <marker
              className="arrowhead-marker"
              id="marker"
              markerHeight="20"
              markerUnits="userSpaceOnUse"
              markerWidth="20"
              orient="auto-start-reverse"
              refX="325"
              refY="325"
              viewBox="0 0 649 649"
              // viewBox="-10 -10 20 20"
            >
              <path
                clipRule="evenodd"
                d="M133.097 21.1209C161.226 -7.04029 206.833 -7.04029 234.963 21.1209L538 324.5L234.963 627.879C206.833 656.04 161.226 656.04 133.097 627.879C104.968 599.718 104.968 554.06 133.097 525.899L334.269 324.5L133.097 123.101C104.968 94.9402 104.968 49.282 133.097 21.1209Z"
                fill="#00A6FF"
                fillRule="evenodd"
              />
            </marker>
          </defs>
        </svg>
        <ReactFlow
          ref={ref}
          connectionLineComponent={ConnectionLine}
          edges={edges}
          edgeTypes={edgeTypes}
          isValidConnection={isValidConnection}
          nodes={nodes}
          nodeTypes={nodeTypes}
          onConnect={onConnect}
          onEdgesChange={onEdgesChange}
          onEdgesDelete={handleOnEdgesDelete}
          onNodesChange={onNodesChange}
          onNodesDelete={handleOnNodesDelete}
          onReconnect={onReconnect}
          onReconnectEnd={onReconnectEnd}
          onReconnectStart={onReconnectStart}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default App;
