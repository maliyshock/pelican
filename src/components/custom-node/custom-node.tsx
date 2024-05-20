import { NodeProps, Position, ReactFlowState, useReactFlow, useStore, useUpdateNodeInternals } from "reactflow";
import "./custom-node.css";
import { GameNodeData } from "~/types";
import { useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useGetAction } from "~/hooks/use-get-action.ts";
import { Timer } from "~/components/timer/timer.tsx";
import { Icon } from "~/components/ui/icons/icon/icon.tsx";
import { Coin } from "~/components/ui/icons/coin.tsx";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addMoney } from "~/slices/money.ts";
import { CHARACTER } from "~/constants/dictionary.ts";
import { Sockets } from "~/components/custom-node/sockets.tsx";
import { RootState } from "~/store";

const connectionNodeIdSelector = (state: ReactFlowState) => state.connectionNodeId;

export default function CustomNode(props: NodeProps<GameNodeData>) {
  const { id, data, isConnectable, dragging } = props;
  const { deleteElements } = useReactFlow();
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const dispatch = useDispatch();
  const updateNodeInternals = useUpdateNodeInternals();
  const { callback, timer, actionName } = useGetAction({ node: props });
  const isTimer = callback && timer;
  const isConnecting = !!connectionNodeId;
  const isTarget = !!connectionNodeId && connectionNodeId !== id;
  const isCharacter = data.roles.includes(CHARACTER);
  const isCmd = useSelector((state: RootState) => state.cmd);

  const handleSell = useCallback(() => {
    if (data.price) {
      deleteElements({ nodes: [props] });
      dispatch(addMoney(data.price));
    }
  }, [data.price, deleteElements, dispatch, props]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, isTarget, updateNodeInternals, isConnecting]);

  useEffect(() => {
    if (data.health === 0) {
      deleteElements({ nodes: [props] });
    }
  }, [data.health, deleteElements, id, props]);

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
        {data.title && (
          <header className="node__header">
            <h3>{data.title}</h3>
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

      {data.inputs && <Sockets isConnectable={isConnectable} isTarget={isTarget} position={Position.Left} sockets={data.inputs} type="target" />}
      {data.outputs && <Sockets isConnectable={isConnectable} isTarget={isTarget} position={Position.Right} sockets={data.outputs} type="source" />}
    </motion.div>
  );
}
