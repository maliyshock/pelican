import "./App.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { Background, Controls, Edge, ReactFlow, Node, useReactFlow, getOutgoers, NodeChange, Connection, EdgeChange } from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "~/components/custom-node/custom-node.tsx";
import { setScreenSize } from "./slices/screen-size.ts";
import { useDispatch, useSelector } from "react-redux";
import { Timer } from "./components/timer/timer.tsx";
import { useCenterCamera } from "~/hooks/useCenterCamera.ts";
import { RootState } from "~/store";
import { setNodeChanges } from "~/slices/nodes.ts";
import CustomEdge from "~/components/custom-edge/custom-edge.tsx";
import { addEdge, removeEdge, setEdgeChanges, updateEdge } from "~/slices/edges.ts";

const nodeTypes = { node: CustomNode };

const edgeTypes = {
  "custom-edge": CustomEdge,
};

// TODO: this file is quite big, it would be a good idea to thing how it can be splited
function App() {
  const edgeUpdateSuccessful = useRef(true);
  const screenSize = useSelector((state: RootState) => state.screenSize);
  const nodes = useSelector((state: RootState) => state.nodes);
  const edges = useSelector((state: RootState) => state.edges);
  const [cameraIsCentered, setCameraIsCentered] = useState(false);
  const { getNodes, getEdges } = useReactFlow();
  const dispatch = useDispatch();
  const onNodesChange = useCallback((changes: NodeChange[]) => dispatch(setNodeChanges(changes)), [dispatch]);
  const onEdgesChange = useCallback((changes: EdgeChange[]) => dispatch(setEdgeChanges(changes)), [dispatch]);
  const onConnect = useCallback(
    (connection: Connection) => {
      dispatch(addEdge(connection));
    },
    [dispatch],
  );
  const centerCamera = useCenterCamera();

  // TODO: can be incapsulate with hook
  const isValidConnection = useCallback(
    (connection: Connection) => {
      const nodes = getNodes();
      const edges = getEdges();
      const target = nodes.find(node => node.id === connection.target);
      const hasCycle = (node: Node, visited = new Set()) => {
        if (visited.has(node.id)) return false;

        visited.add(node.id);

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
      };

      if (target?.id === connection.source) return false;
      return !!target && !hasCycle(target);
    },
    [getNodes, getEdges],
  );

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      edgeUpdateSuccessful.current = true;
      dispatch(updateEdge({ oldEdge, newConnection }));
    },
    [dispatch],
  );

  const onEdgeUpdateEnd = useCallback(
    (_: MouseEvent | TouchEvent, edge: Edge) => {
      if (!edgeUpdateSuccessful.current) {
        dispatch(removeEdge(edge.id));
      }

      edgeUpdateSuccessful.current = true;
    },
    [dispatch],
  );

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
        <Timer />
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
