import "./css/app.css";
import { useCallback, useEffect, useState } from "react";
import { Background, Controls, ReactFlow, useEdgesState } from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./components/custom-node/custom-node.tsx";
import { setScreenSize } from "./slices/screen-size.ts";
import { useDispatch, useSelector } from "react-redux";
import { useCenterCamera } from "./hooks/use-center-camera.ts";
import { RootState } from "./store";
import CustomEdge from "./components/custom-edge/custom-edge.tsx";
import { useEdges } from "./hooks/use-edges.ts";
import { Header } from "./components/ui/header/header.tsx";
import { useKeyListener } from "./hooks/use-key-listener.ts";
import { useOnConnect } from "./hooks/use-on-connect.ts";
import { useNodes } from "./hooks/use-nodes.ts";
import { useCraftingManager } from "./hooks/use-crafting-manager.ts";
import { MakeChoice } from "./components/make-choice/make-choice.tsx";

const nodeTypes = { node: CustomNode };
const edgeTypes = {
  "custom-edge": CustomEdge,
};

function App() {
  const dispatch = useDispatch();
  const screenSize = useSelector((state: RootState) => state.screenSize);
  const { handleOnNodesChange, handleOnNodesDelete, nodes } = useNodes();
  const [edges, , onEdgesChange] = useEdgesState([]);
  const { isValidConnection, onEdgeUpdate, onEdgeUpdateStart, onEdgeUpdateEnd } = useEdges();
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
          dispatch(setScreenSize({ width: screenSize.width, height: screenSize.height }));
        }
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (!cameraIsCentered) {
      const player = nodes.find(node => node.id.includes("pelican"))!;

      if (player) {
        centerCamera(player.position.x, player.position.y, screenSize);
        setCameraIsCentered(true);
      }
    }
  }, [cameraIsCentered, centerCamera, nodes, screenSize]);

  return (
    <div className="app">
      {/*on explore*/}
      <MakeChoice />
      <div className="node-sandbox">
        <Header />
        {/*<CenterCameraButton />*/}
        <ReactFlow
          ref={ref}
          edges={edges}
          edgeTypes={edgeTypes}
          isValidConnection={isValidConnection}
          nodes={nodes}
          nodeTypes={nodeTypes}
          onConnect={onConnect}
          onEdgesChange={onEdgesChange}
          onEdgeUpdate={onEdgeUpdate}
          onEdgeUpdateEnd={onEdgeUpdateEnd}
          onEdgeUpdateStart={onEdgeUpdateStart}
          onNodesChange={handleOnNodesChange}
          onNodesDelete={handleOnNodesDelete}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default App;
