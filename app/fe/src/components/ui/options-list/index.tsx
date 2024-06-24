import { ReactNode, useCallback, useEffect, useState } from "react";
import { Option } from "~/components/make-choice/option.tsx";
import { GameNodeData } from "@pelican/constants";

interface OptionsListProps {
  title?: ReactNode;
  items: GameNodeData[];
  limit?: number;
  onSelect: (items: GameNodeData[]) => void;
}

export function OptionsList({ title, items, limit, onSelect }: OptionsListProps) {
  const [selected, setSelected] = useState<number[]>([]);

  const handleSelection = useCallback(
    (index: number) => {
      if (limit !== undefined && selected.length < limit) {
        setSelected(prev => [...prev, index]);
      }
    },
    [limit, selected.length],
  );
  const handleDeSelection = useCallback((index: number) => {
    setSelected(prev => prev.filter(ind => ind !== index));
  }, []);

  useEffect(() => {
    const selectedItems = selected.map(ind => items[ind]);

    onSelect(selectedItems);
  }, [items, onSelect, selected]);

  return (
    <div>
      {title}
      <ul className="options-list">
        {items.map((option, index) => (
          <Option
            key={`${option}_${index}`}
            active={selected.includes(index)}
            index={index}
            limitIsReached={selected.length === limit}
            option={option}
            onDeSelect={handleDeSelection}
            onSelect={handleSelection}
          />
        ))}
      </ul>
    </div>
  );
}
