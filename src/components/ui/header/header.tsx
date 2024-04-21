import { Clocks } from "~/components/clocks/clocks.tsx";
import "./header.css";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import { Coin } from "~/components/ui/icons/coin.tsx";
import { Icon } from "~/components/ui/icons/icon/icon.tsx";

export function Header() {
  const money = useSelector((state: RootState) => state.money);
  // use resources counter
  return (
    <header className="header">
      <div className="header__inner wrapper">
        <div className="header__money">
          <Icon icon={<Coin />} value={money} size="big" />
        </div>
        <div className="header__clocks">
          <Clocks />
        </div>
        <div className="header__resources"></div>
      </div>
    </header>
  );
}
