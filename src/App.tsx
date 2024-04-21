import "./css/app.css";
import { useCallback, useEffect, useState } from "react";
import { Background, Controls, ReactFlow, Connection, useNodesState, useEdgesState, addEdge } from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "~/components/custom-node/custom-node.tsx";
import { setScreenSize } from "./slices/screen-size.ts";
import { useDispatch, useSelector } from "react-redux";
import { useCenterCamera } from "~/hooks/use-center-camera.ts";
import { RootState } from "~/store";
import CustomEdge from "~/components/custom-edge/custom-edge.tsx";
import { useEdges } from "~/hooks/use-edges.ts";
import { INIT_NODES } from "~/constants/constants.tsx";
import { Header } from "~/components/ui/header/header.tsx";

const nodeTypes = { node: CustomNode };

const edgeTypes = {
  "custom-edge": CustomEdge,
};

function App() {
  const dispatch = useDispatch();
  const screenSize = useSelector((state: RootState) => state.screenSize);
  const [nodes, , onNodesChange] = useNodesState(INIT_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { isValidConnection, onEdgeUpdate, onEdgeUpdateStart, onEdgeUpdateEnd } = useEdges();
  const [cameraIsCentered, setCameraIsCentered] = useState(false);
  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges(oldEdges => {
        // connection has id of source and target handles and also has id of source and target nodes itself
        return addEdge({ ...connection, type: "custom-edge" }, oldEdges);
      }),
    [setEdges],
  );
  const centerCamera = useCenterCamera();

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
      const player = nodes.find(node => node.id === "player")!;
      centerCamera(player.position.x, player.position.y, screenSize);
      setCameraIsCentered(true);
    }
  }, [cameraIsCentered, centerCamera, nodes, screenSize]);

  return (
    <div className="app">
      <div className="node-sandbox">
        <Header />
        {/*<CenterCameraButton />*/}
        <ReactFlow
          ref={ref}
          isValidConnection={isValidConnection}
          nodes={nodes}
          nodeTypes={nodeTypes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgeUpdate={onEdgeUpdate}
          onEdgeUpdateStart={onEdgeUpdateStart}
          onEdgeUpdateEnd={onEdgeUpdateEnd}
          edgeTypes={edgeTypes}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default App;
