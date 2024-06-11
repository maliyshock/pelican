import { ResourceKind } from "~/types/resource";
import { ResourceDepositKind } from "~/types/resource-deposit";
import { RegionKind } from "~/types/region";

export type ResourceContainer = ResourceKind | ResourceDepositKind | RegionKind;
