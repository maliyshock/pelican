import { Clocks } from "~/components/clocks/clocks.tsx";
import "./header.css";
import { Coin } from "~/components/ui/icons/coin.tsx";
import { Icon } from "~/components/ui/icons/icon/icon.tsx";
import useStore from "~/store/use-store.ts";
import { Button } from "antd";
import { useCallback } from "react";
import { useReactFlow } from "reactflow";
import { changeNodeValueBy } from "~/utils/change-node-value-by.ts";
import { getRandomNum } from "~/utils/get-random-num.ts";

export function Header() {
  const money = useStore(state => state.money);
  const { nodes } = useStore(state => state.nodesCounter);
  const resourceKeys = nodes["resource-deposit"] ? Object.keys(nodes["resource-deposit"]).sort() : [];
  const { setNodes, getNodes } = useReactFlow();

  // TODO: resource deposit should includes all of the outcome resources
  // you have to use root key here

  // const handleFeed = useCallback(() => {
  //   const player = getNodes().find(node => node.id.includes("pelican"))!;
  //
  //   if (player) {
  //     setNodes(prev => {
  //       return changeNodeValueBy({
  //         nodes: prev,
  //         ids: [player.id],
  //         changes: [{ keys: ["data", "profile", "digestion", "satiety"], value: getRandomNum(5) }],
  //       });
  //     });
  //   }
  // }, [getNodes, setNodes]);

  return (
    <header className="header">
      {/*<Button onClick={handleFeed}>Feed me</Button>*/}
      <div className="header__inner wrapper">
        <div className="header__money">
          <Icon icon={<Coin />} size="big" value={money} />
        </div>
        <div className="header__clocks">
          <Clocks />
        </div>
        <div className="header__resources">
          {/*{resourceKeys.map(key => (*/}
          {/*  <div key={key}>*/}
          {/*    {key}: {nodes["resource-deposit"]![key as RoleKind]}*/}
          {/*  </div>*/}
          {/*))}*/}
        </div>
      </div>
    </header>
  );
}
