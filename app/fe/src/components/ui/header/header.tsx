import { Clocks } from "~/components/clocks/clocks.tsx";
import "./header.css";
import { Coin } from "~/components/ui/icons/coin.tsx";
import { Icon } from "~/components/ui/icons/icon/icon.tsx";
import { RoleKind, TypeKind } from "@pelican/constants";
import useStore from "~/store/use-store.ts";

export function Header() {
  const money = useStore(state => state.money);
  const { nodes } = useStore(state => state.nodesCounter);
  const resourceKeys = nodes["resource-deposit"] ? Object.keys(nodes["resource-deposit"]).sort() : [];

  // TODO: resource deposit should includes all of the outcome resources
  // you have to use root key here

  return (
    <header className="header">
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
