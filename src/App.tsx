import "./App.css";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  Edge,
  ReactFlow,
  Node,
  useReactFlow,
  getOutgoers,
  updateEdge,
  NodeChange,
  Connection,
  EdgeChange,
} from "reactflow";
import "reactflow/dist/style.css";
import Player from "./components/node/player-node.tsx";
import { set } from "./slices/screen-size.ts";
import { useDispatch, useSelector } from "react-redux";
import { Timer } from "./components/timer.tsx";
import { useCenterCamera } from "~/hooks/useCenterCamera.ts";
import { RootState } from "~/store";

const nodeTypes = { player: Player };

const pelicanNode = {
  id: "player",
  data: { name: "Pelican", inputs: [{ type: "input" }], outputs: [{ type: "output" }] },
  position: { x: 0, y: 0 },
  type: "player",
};

const initialNodes = [
  pelicanNode,
  {
    id: "2",
    data: { label: "World" },
    position: { x: 400, y: 100 },
  },
];

// TODO: this file is quite big, it would be a good idea to thing how it can be splited
function App() {
  const edgeUpdateSuccessful = useRef(true);
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [cameraIsCentered, setCameraIsCentered] = useState(false);
  const { getNodes, getEdges } = useReactFlow();
  const dispatch = useDispatch();
  const onNodesChange = useCallback((changes: NodeChange[]) => setNodes(nds => applyNodeChanges(changes, nds)), [setNodes]);
  const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges(eds => applyEdgeChanges(changes, eds)), [setEdges]);
  const onConnect = useCallback((connection: Connection) => setEdges((eds: Edge[]) => addEdge(connection, eds)), [setEdges]);
  const centerCamera = useCenterCamera();
  const screenSize = useSelector((state: RootState) => state.screenSize);

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

  const onEdgeUpdate = useCallback((oldEdge: Edge, newConnection: Connection) => {
    edgeUpdateSuccessful.current = true;
    setEdges(els => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_: MouseEvent | TouchEvent, edge: Edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges(eds => eds.filter(e => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        const screenSize = node.getBoundingClientRect();
        if (screenSize?.width && screenSize?.height) {
          dispatch(set({ width: screenSize.width, height: screenSize.height }));
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
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default App;
