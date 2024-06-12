import { Clocks } from "~/components/clocks/clocks.tsx";
import "./header.css";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import { Coin } from "~/components/ui/icons/coin.tsx";
import { Icon } from "~/components/ui/icons/icon/icon.tsx";
import { TypeKind } from "@pelican/constants";

export function Header() {
  const money = useSelector((state: RootState) => state.money);
  const nodesCounter = useSelector((state: RootState) => state.nodesCounter);
  const resourceKeys = nodesCounter["resource-deposit"] ? Object.keys(nodesCounter["resource-deposit"]).sort() : [];

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
          {resourceKeys.map(key => (
            <div key={key}>
              {key}: {nodesCounter["resource-deposit"]![key as TypeKind]}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
