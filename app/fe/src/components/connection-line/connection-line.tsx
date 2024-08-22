import { useConnection } from "@xyflow/react";
import "./connection-line.css";
import { ConnectionLineRenderer } from "~/components/ui/connection-line-renderer.tsx";

export type ConnectionLineProps = {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
};

export function ConnectionLine({ fromX, fromY, toX, toY }: ConnectionLineProps) {
  const { fromHandle } = useConnection();

  if (fromHandle === null || fromHandle === undefined) return null;

  return <ConnectionLineRenderer marker="marker" path={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`} type={fromHandle.type} />;
}
