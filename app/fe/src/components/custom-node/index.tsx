import { NodeProps, ReactFlowState, useReactFlow, useStore as useReactFlowStore, useUpdateNodeInternals } from "reactflow";
import "../ui/card/card.css";
import { useCallback, useEffect, useMemo } from "react";
import { useGetAction } from "~/hooks/use-get-action.ts";
import { Card } from "../ui/card/card.tsx";
import { GameNode, GameNodeData } from "@pelican/constants";
import useStore from "~/store/use-store.ts";
import { useHungerManager } from "~/components/custom-node/hooks/use-hunger-manager.ts";
import { useGetValues } from "~/components/custom-node/hooks/use-get-values.tsx";

const connectionNodeIdSelector = (state: ReactFlowState) => state.connectionNodeId;

export default function CustomNode(props: NodeProps<GameNodeData>) {
  const { addMoney } = useStore(store => store.money);
  const { id, isConnectable, dragging } = props;
  const { getNode } = useReactFlow();
  const currentNode = getNode(id) as GameNode;
  const { data } = currentNode;
  const { deleteElements } = useReactFlow();
  const connectionNodeId = useReactFlowStore(connectionNodeIdSelector);
  const updateNodeInternals = useUpdateNodeInternals();
  const action = useGetAction({ node: currentNode });
  const isConnecting = !!connectionNodeId;
  const isTarget = !!connectionNodeId && connectionNodeId !== id;
  const isCharacter = data.roles.includes("character");
  const isCmd = useStore(state => state.cmdIsPressed);
  const values = useGetValues(data);

  useHungerManager({ digestion: data.profile?.digestion, id });

  const handleSell = useCallback(() => {
    if (data.price) {
      deleteElements({ nodes: [props] });
      addMoney(data.price);
    }
  }, [addMoney, data.price, deleteElements, props]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, isTarget, updateNodeInternals, isConnecting]);

  useEffect(() => {
    if (data.health !== undefined && data.health <= 0) {
      // TODO: check altar
      // TODO: trigger the end
      deleteElements({ nodes: [currentNode] });
    }
  }, [currentNode, data.health, deleteElements]);

  const timer = useMemo(
    () =>
      action?.callback && action.timer !== undefined && action?.actionName
        ? {
            value: action.timer,
            actionName: action.actionName,
            callback: action.callback,
          }
        : undefined,
    [action?.actionName, action?.callback, action?.timer],
  );

  return (
    <Card
      className={`${dragging ? "dragging" : ""} ${!isCharacter ? "grabbable" : ""}`}
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
      timer={timer}
      title={data.title}
      values={values}
    />
  );
}
