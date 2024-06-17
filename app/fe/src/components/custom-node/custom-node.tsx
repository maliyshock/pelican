import { NodeProps, ReactFlowState, useReactFlow, useStore as useReactFlowStore, useUpdateNodeInternals } from "reactflow";
import "../ui/card.css";
import { useCallback, useEffect } from "react";
import { useGetAction } from "~/hooks/use-get-action.ts";
import { Card, Value } from "../ui/card.tsx";
import { GameNode, GameNodeData } from "@pelican/constants";
import useStore from "~/store/use-store.ts";

const connectionNodeIdSelector = (state: ReactFlowState) => state.connectionNodeId;

export default function CustomNode(props: NodeProps<GameNodeData>) {
  const addMoney = useStore(store => store.addMoney);
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
  const values = [
    ...(data.dmg ? [{ value: data.dmg, className: "bottom-left bg-silver" }] : []),
    ...(data.health ? [{ value: data.health, className: "bottom-right bg-lasagna" }] : []),
  ] as Value[];

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
    if (data.health === 0) {
      deleteElements({ nodes: [currentNode] });
    }
  }, [currentNode, data.health, deleteElements]);

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
      timer={
        action?.callback && action?.timer && action?.actionName
          ? {
              value: action.timer,
              actionName: action.actionName,
              callback: action.callback,
            }
          : undefined
      }
      title={data.title}
      values={values}
    />
  );
}
