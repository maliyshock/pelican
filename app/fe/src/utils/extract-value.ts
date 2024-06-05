import { getValue } from "./get-value.ts";
import { GetFieldType } from "../../../common/src/types/utils.ts";

export function extractValue<T, TPath extends string>(nodes: T[], path: TPath): GetFieldType<T, TPath>[] {
  return nodes.map(node => getValue(node, path));
}
