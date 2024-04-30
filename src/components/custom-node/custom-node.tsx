import { Handle, NodeProps, Position, ReactFlowState, useReactFlow, useStore, useUpdateNodeInternals } from "reactflow";
import "./custom-node.css";
import { GameObject } from "~/types";
import { useCallback, useEffect } from "react";
import { ArrowRightFromLine, ArrowRightToLine } from "lucide-react";
import { motion } from "framer-motion";
import { useGetAction } from "~/hooks/use-get-action.ts";
import { Timer } from "~/components/timer/timer.tsx";
import { Icon } from "~/components/ui/icons/icon/icon.tsx";
import { Coin } from "~/components/ui/icons/coin.tsx";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addMoney } from "~/slices/money.ts";
import { RootState } from "~/store";
import { CHARACTER } from "~/constants/dictionary.ts";

const connectionNodeIdSelector = (state: ReactFlowState) => state.connectionNodeId;

export default function CustomNode(props: NodeProps<GameObject>) {
  const { id, data, isConnectable, dragging } = props;
  const { setNodes } = useReactFlow();
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const isCmd = useSelector((state: RootState) => state.cmd);
  const dispatch = useDispatch();
  const updateNodeInternals = useUpdateNodeInternals();
  const { callback, timer, actionName } = useGetAction({ node: props });
  const isTimer = callback && timer;
  const isConnecting = !!connectionNodeId;
  //TODO validation?
  const isTarget = connectionNodeId && connectionNodeId !== id;
  const isCharacter = data.objectType.includes(CHARACTER);

  const handleSell = useCallback(() => {
    if (data.price && data.price > 0) {
      setNodes(nodes => nodes.filter(node => node.id !== id));
      dispatch(addMoney(data.price));
    }
  }, [data.price, dispatch, id, setNodes]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, isTarget, updateNodeInternals, isConnecting]);

  return (
    <motion.div className={`node-wrapper ${dragging ? "dragging" : ""} ${!isCharacter ? "grabbable" : ""}`} whileHover={{ scale: 1.1 }}>
      <motion.div
        className={`node__inner ${isCmd && !isCharacter ? "cmd" : ""}`}
        initial={{ boxShadow: "0 0px 12px rgba(0, 0, 0, 0.06)" }}
        whileHover={{ boxShadow: "0 16px 12px rgba(0, 0, 0, 0.03)", outline: "4px solid var(--blue)" }}
      >
        {data.price && (
          <Button className="node__value-container node__sale" shape="circle" onClick={handleSell}>
            <Icon icon={<Coin />} size="fill" value={data.price} valueOnIcon />
          </Button>
        )}
        {isTimer && <Timer callback={callback} label={actionName} time={timer} />}
        {data.name && (
          <header className="node__header">
            <h3>{data.name}</h3>
          </header>
        )}
        {data.img && (
          <div className="node__body">
            <img alt={data.img.alt} className="img" src={data.img.src} />
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

      {isTarget && (
        <Handle
          key="catcher"
          className={`handle-overlay handle-reset ${isCmd ? "" : "transparent"} ${isTarget ? "catcher" : ""}`}
          id="catcher"
          position={Position.Left}
          type="target"
        />
      )}

      <Handle
        key="source-catcher"
        className={`handle-overlay handle-reset ${isCmd ? "" : "transparent"}`}
        id="source-catcher"
        position={Position.Left}
        type="source"
      />

      <div className="node__connectors node__inputs">
        {data.inputs?.map((_input, index) => (
          <Handle
            key={`handle-input-${index}`}
            className="handle input handle-reset"
            id={`handle-input-${index}`}
            isConnectable={isConnectable}
            position={Position.Left}
            type="target"
          >
            <ArrowRightToLine height="100%" strokeWidth={3} width="100%" />
          </Handle>
        ))}
      </div>

      <div className="node__connectors node__outputs">
        {data.outputs?.map((_output, index) => (
          <Handle
            key={`handle-output-${index}`}
            className="handle handle-reset"
            id={`handle-output-${index}`}
            isConnectable={isConnectable && !isCharacter}
            isConnectableStart={!isCharacter}
            position={Position.Right}
            type="source"
          >
            <ArrowRightFromLine height="100%" strokeWidth={3} width="100%" />
          </Handle>
        ))}
      </div>
    </motion.div>
  );
}
