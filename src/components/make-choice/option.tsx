import { GameNodeData } from "~/types";
import { useCallback } from "react";
import { Card } from "~/components/ui/card.tsx";
import { createImg } from "~/utils/create-img.ts";

interface OptionProps {
  option: GameNodeData;
  index: number;
  limitIsReached: boolean;
  active: boolean;
  onSelect(index: number): void;
  onDeSelect(index: number): void;
}

export function Option({ index, option, limitIsReached, active, onSelect, onDeSelect }: OptionProps) {
  const handleSelect = useCallback(() => {
    if (!limitIsReached && !active) onSelect(index);
    if (active) onDeSelect(index);
  }, [active, index, limitIsReached, onDeSelect, onSelect]);

  return (
    <li className={`options-list__item`} onClick={handleSelect}>
      <Card
        active={active}
        className="small"
        dmg={option.dmg}
        health={option.health}
        img={createImg(option.type)}
        price={
          option.price
            ? {
                value: option.price,
              }
            : undefined
        }
        title={option.title}
      />
    </li>
  );
}
