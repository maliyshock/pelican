import { Clocks } from "~/components/clocks/clocks.tsx";
import "./header.css";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import { Coin } from "~/components/ui/icons/coin.tsx";
import { Icon } from "~/components/ui/icons/icon/icon.tsx";

export function Header() {
  const money = useSelector((state: RootState) => state.money);
  const nodesCounter = useSelector((state: RootState) => state.nodesCounter);
  const resourceKeys = nodesCounter.resourceDeposit ? Object.keys(nodesCounter.resourceDeposit) : [];

  return (
    <header className="header">
      <div className="header__inner wrapper">
        <div className="header__money">
          <Icon icon={<Coin />} value={money} size="big" />
        </div>
        <div className="header__clocks">
          <Clocks />
        </div>
        <div className="header__resources">
          {resourceKeys.map(key => (
            <div key={key}>
              {key}: {nodesCounter.resourceDeposit![key as keyof typeof nodesCounter.resourceDeposit]}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
