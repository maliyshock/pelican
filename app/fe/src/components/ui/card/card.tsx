import { motion } from "framer-motion";
import { Icon } from "../icons/icon/icon.tsx";
import { Coin } from "../icons/coin.tsx";
import { Timer } from "~/components/timer/timer.tsx";
import { Position } from "@xyflow/react";
import { ReactNode } from "react";
import { Socket } from "@pelican/constants";
import { Sockets } from "~/components/custom-node/components/sockets.tsx";
import { InventoryItemBorder } from "~/components/ui/icons/inventory-item-border.tsx";

interface CardProps {
  items?: Array<string>;
  isOrigin?: boolean;
  className?: string;
  innerClassName?: string;
  title?: ReactNode;
  img: {
    alt: string;
    src: string;
  };
  values: ReactNode[];
  isConnectable?: boolean;
  isTarget?: boolean;
  inputs?: Socket[];
  outputs?: Socket[];
  active?: boolean;
  timer?: {
    value: number;
    actionName: string;
    callback(): void;
  };
  price?: {
    value: number;
    handler?(): void;
  };
  disabled?: boolean;
  onClick?(): void;
}

const activeWrapper = { scale: 1.1 };
const activeInnerWrapper = { boxShadow: "0 16px 12px rgba(0, 0, 0, 0.03)", outline: "4px solid var(--blue)" };

export function Card({
  items = [],
  isOrigin = false,
  className,
  innerClassName,
  title,
  img,
  values,
  inputs,
  outputs,
  timer,
  isConnectable,
  isTarget,
  active,
  disabled,
  onClick = () => {},
}: CardProps) {
  return (
    <motion.div
      animate={active ? activeWrapper : {}}
      className={`card-wrapper ${className || ""} ${disabled ? "disabled" : ""}`}
      whileTap={activeWrapper}
      onClick={onClick}
    >
      <motion.div
        animate={active ? activeInnerWrapper : {}}
        className={`card__inner ${innerClassName || ""}`}
        initial={{ boxShadow: "0 0px 12px rgba(0, 0, 0, 0.06)", outline: "2px solid black" }}
        whileHover={!disabled ? { boxShadow: "0 16px 12px rgba(0, 0, 0, 0.03)", outline: "4px solid var(--blue)" } : {}}
      >
        {timer !== undefined && <Timer callback={timer.callback} className="card__timer" label={timer.actionName} time={timer.value} />}
        {title && (
          <header className="card__header">
            <h3>{title}</h3>
          </header>
        )}
        {(img || items!.length > 0) && (
          <div className="card__body">
            <img alt={img.alt} className="img card-wrapper__img" src={img.src} />

            {items!.length > 0 && (
              <div className="card__items items">
                <ul className="items__list">
                  {items!.map((item, index) => (
                    <li key={`item_${index}`} className="items__item">
                      <InventoryItemBorder className="items__item-border" />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        {values}
      </motion.div>

      {isOrigin && <div className="handle-overlay handle-reset" style={{ backgroundColor: "red" }}></div>}
      {inputs && <Sockets isConnectable={disabled ? false : isConnectable} isTarget={isTarget} position={Position.Left} sockets={inputs} type="target" />}
      {outputs && <Sockets isConnectable={disabled ? false : isConnectable} isTarget={isTarget} position={Position.Right} sockets={outputs} type="source" />}
    </motion.div>
  );
}
