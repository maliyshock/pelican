import { AVERAGE_DELIVERY_SPEED } from "~/constants";

export function getTime(length: number) {
  return Math.round(length / AVERAGE_DELIVERY_SPEED);
}

export function getLength(edgePath: string) {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  path.setAttributeNS(null, "d", edgePath);

  return path.getTotalLength();
}
