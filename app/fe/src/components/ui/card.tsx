import { motion } from "framer-motion";
import { Button } from "antd";
import { Icon } from "./icons/icon/icon.tsx";
import { Coin } from "./icons/coin.tsx";
import { Timer } from "../timer/timer.tsx";
import { Sockets } from "../custom-node/sockets.tsx";
import { Position } from "reactflow";
import { ReactNode } from "react";
import { Socket } from "@pelican/constants";

interface CardProps {
  className?: string;
  innerClassName?: string;
  title?: ReactNode;
  img: {
    alt: string;
    src: string;
  };
  dmg?: number;
  health?: number;
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
}

const activeWrapper = { scale: 1.1 };
const activeInnerWrapper = { boxShadow: "0 16px 12px rgba(0, 0, 0, 0.03)", outline: "4px solid var(--blue)" };

export function Card({ className, innerClassName, title, img, dmg, health, inputs, outputs, timer, price, isConnectable, isTarget, active }: CardProps) {
  return (
    <motion.div animate={active ? activeWrapper : {}} className={`card-wrapper ${className || ""}`} whileHover={activeWrapper}>
      <motion.div
        animate={active ? activeInnerWrapper : {}}
        className={`card__inner ${innerClassName || ""}`}
        initial={{ boxShadow: "0 0px 12px rgba(0, 0, 0, 0.06)" }}
        whileHover={{ boxShadow: "0 16px 12px rgba(0, 0, 0, 0.03)", outline: "4px solid var(--blue)" }}
      >
        {price && (
          <Button className="card__value-container card__sale" shape="circle" onClick={() => price?.handler && price.handler()}>
            <Icon icon={<Coin />} size="fill" value={price.value} valueOnIcon />
          </Button>
        )}
        {timer && <Timer callback={timer.callback} label={timer.actionName} time={timer.value} />}
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
        {dmg && (
          <div className="card__value-container card__dmg">
            <div className="card__value">{dmg}</div>
          </div>
        )}
        {health && (
          <div className="card__value-container card__health">
            <div className="card__value">{health}</div>
          </div>
        )}
      </motion.div>

      {inputs && <Sockets isConnectable={isConnectable} isTarget={isTarget} position={Position.Left} sockets={inputs} type="target" />}
      {outputs && <Sockets isConnectable={isConnectable} isTarget={isTarget} position={Position.Right} sockets={outputs} type="source" />}
    </motion.div>
  );
}
