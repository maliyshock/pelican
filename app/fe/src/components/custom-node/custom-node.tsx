import { NodeProps, ReactFlowState, useReactFlow, useStore, useUpdateNodeInternals } from "reactflow";
import "../ui/card.css";
import { useCallback, useEffect } from "react";
import { useGetAction } from "~/hooks/use-get-action.ts";
import { useDispatch, useSelector } from "react-redux";
import { addMoney } from "~/slices/money.ts";
import { RootState } from "~/store";
import { Card } from "../ui/card.tsx";
import { GameNodeData } from "@pelican/constants";

const connectionNodeIdSelector = (state: ReactFlowState) => state.connectionNodeId;

export default function CustomNode(props: NodeProps<GameNodeData>) {
  const { id, data, isConnectable, dragging } = props;
  const { deleteElements } = useReactFlow();
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const dispatch = useDispatch();
  const updateNodeInternals = useUpdateNodeInternals();
  const { callback, timer, actionName } = useGetAction({ node: props });
  const isTimer = callback && timer && actionName;
  const isConnecting = !!connectionNodeId;
  const isTarget = !!connectionNodeId && connectionNodeId !== id;
  const isCharacter = data.roles.includes("character");
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
    <Card
      className={`${dragging ? "dragging" : ""} ${!isCharacter ? "grabbable" : ""}`}
      dmg={data.dmg}
      health={data.health}
      img={data.img}
      innerClassName={`${isCmd && !isCharacter ? "cmd" : ""}`}
      inputs={data.inputs}
      isConnectable={isConnectable}
      isTarget={isTarget}
      outputs={data.outputs}
      price={
        data.price
          ? {
              value: data.price,
              handler: handleSell,
            }
          : undefined
      }
      timer={
        isTimer
          ? {
              value: timer,
              actionName,
              callback,
            }
          : undefined
      }
      title={data.title}
    />
  );
}
