import { Coin } from "~/components/ui/icons/coin.tsx";

import "./price.scss";
import { IndicatorValue } from "~/components/ui/card/indicator-value.tsx";

export function Price({ value, onClick }) {
  return (
    <button className="price-indicator indicator btn-reset" onClick={onClick}>
      <IndicatorValue className="price-indicator__value-container" value={value} />
      <Coin />
    </button>
  );
}
