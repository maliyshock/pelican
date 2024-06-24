import { motion } from "framer-motion";
import { Button } from "antd";
import { Icon } from "../icons/icon/icon.tsx";
import { Coin } from "../icons/coin.tsx";
import { Timer } from "~/components/timer/timer.tsx";
import { Position } from "reactflow";
import { ReactNode } from "react";
import { Socket } from "@pelican/constants";
import { Sockets } from "~/components/custom-node/components/sockets.tsx";

export type Value = {
  value: number;
  max?: number;
  className?: string;
};

interface CardProps {
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
  className,
  innerClassName,
  title,
  img,
  values,
  inputs,
  outputs,
  timer,
  price,
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
      whileHover={activeWrapper}
      onClick={onClick}
    >
      <motion.div
        animate={active ? activeInnerWrapper : {}}
        className={`card__inner ${innerClassName || ""}`}
        initial={{ boxShadow: "0 0px 12px rgba(0, 0, 0, 0.06)" }}
        whileHover={!disabled ? { boxShadow: "0 16px 12px rgba(0, 0, 0, 0.03)", outline: "4px solid var(--blue)" } : {}}
      >
        {price && (
          <Button className="card__value-container card__sale" shape="circle" onClick={() => price?.handler && price.handler()}>
            <Icon icon={<Coin />} size="fill" value={price.value} valueOnIcon />
          </Button>
        )}
        {timer !== undefined && <Timer callback={timer.callback} label={timer.actionName} time={timer.value} />}
        {title && (
          <header className="card__header">
            <h3>{title}</h3>
          </header>
        )}
        {img && (
          <div className="card__body">
            <img alt={img.alt} className="img" src={img.src} />
          </div>
        )}
        {values}
      </motion.div>

      {inputs && <Sockets isConnectable={disabled ? false : isConnectable} isTarget={isTarget} position={Position.Left} sockets={inputs} type="target" />}
      {outputs && <Sockets isConnectable={disabled ? false : isConnectable} isTarget={isTarget} position={Position.Right} sockets={outputs} type="source" />}
    </motion.div>
  );
}
