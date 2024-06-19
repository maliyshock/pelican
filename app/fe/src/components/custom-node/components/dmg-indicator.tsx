import "./dmg-indicator.css";
import { Sword } from "~/components/ui/icons/sword.tsx";

interface DmgIndicatorProps {
  value: number;
}

export function DmgIndicator({ value }: DmgIndicatorProps) {
  return (
    <div className="card__value-container bottom-left dmg-indicator">
      <div className="dmg-indicator__decor">
        <Sword />
      </div>
      <div className="card__value">{value}</div>
    </div>
  );
}
