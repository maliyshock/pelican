import { getValue } from "./get-value.ts";
import { GetFieldType } from "~/types/get-field-type.ts";

export function extractValue<T, TPath extends string>(nodes: T[], path: TPath): GetFieldType<T, TPath>[] {
  return nodes.map(node => getValue(node, path));
}
