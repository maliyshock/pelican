import { NodeProps, ReactFlowState, useReactFlow, useStore as useReactFlowStore, useUpdateNodeInternals } from "@xyflow/react";
import "../ui/card/card.css";
import { useCallback, useEffect, useMemo } from "react";
import { useGetAction } from "~/hooks/use-get-action/use-get-action.ts";
import { Card } from "../ui/card/card.tsx";
import { GameNode, GameNodeData, RECIPES_BOOK } from "@pelican/constants";
import useStore from "~/store/use-store.ts";
import { useHungerManager } from "~/components/custom-node/hooks/use-hunger-manager.ts";
import { useGetValues } from "~/components/custom-node/hooks/use-get-values.tsx";
import { useFuelManager } from "~/components/custom-node/hooks/use-fuel-manager.ts";
import { useStatusesManager } from "~/components/custom-node/hooks/use-statuses-manager.ts";
import { useConnectionManager } from "~/hooks/use-connection-manager/use-connection-manager.ts";
import { getRecipeKey } from "~/utils/get-recipe-key.ts";
import { usePlayerSubscriptionManager } from "~/components/custom-node/hooks/use-player-subscription-manager.ts";

const connectionNodeIdSelector = (state: ReactFlowState) => state.connection.fromHandle?.nodeId;

// situations:
// connected to the group - track group
// connected to the node without group and group gonna be created later on
// how to get group ? i need an id of target

export default function CustomNode(props: NodeProps<GameNodeData>) {
  const { id, isConnectable, dragging } = props;
  const { addMoney } = useStore(store => store.money);

  const { cmdIsPressed: isCmd } = useStore(state => state.cmd);
  const { nodesMap } = useStore(state => state.resourceGroups);

  const { getNode, deleteElements } = useReactFlow();
  const connectionNodeId = useReactFlowStore(connectionNodeIdSelector);
  const currentNode = getNode(id) as GameNode;
  const { data } = currentNode;
  const updateNodeInternals = useUpdateNodeInternals();
  const action = useGetAction({ node: currentNode });
  const isConnecting = !!connectionNodeId;
  const isTarget = !!connectionNodeId && connectionNodeId !== id;
  const isCharacter = data.roles.includes("character");
  const values = useGetValues(data);
  const die = useCallback(() => {
    // console.log("die")
  }, []);

  usePlayerSubscriptionManager(id);
  useStatusesManager({ data, statuses: data.statuses || {}, id });
  useHungerManager({ digestion: data.profile?.digestion, id });
  useFuelManager({ fire: data?.fire, id, die });

  const handleSell = useCallback(() => {
    if (data.price) {
      deleteElements({ nodes: [{ id }] });
      addMoney(data.price);
    }
  }, [addMoney, data.price, deleteElements, id]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, isTarget, updateNodeInternals, isConnecting]);

  useEffect(() => {
    if (data.health !== undefined && data.health <= 0) {
      // TODO: check altar
      // TODO: trigger the end
      deleteElements({ nodes: [currentNode] });
      // die()
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

  const price = useMemo(
    () =>
      data.price
        ? {
            value: data.price,
            handler: handleSell,
          }
        : undefined,
    [data.price, handleSell],
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
      price={price}
      timer={timer}
      title={data.title}
      values={values}
    />
  );
}
