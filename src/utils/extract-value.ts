import { getValue } from "~/utils/get-value.ts";
import { GetFieldType } from "~/types/utils.ts";

export function extractValue<T, TPath extends string>(nodes: T[], path: TPath): GetFieldType<T, TPath>[] {
  return nodes.map(node => getValue(node, path));
}
