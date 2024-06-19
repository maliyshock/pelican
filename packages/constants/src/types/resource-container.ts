import { ResourceKind } from "~/types/build/resource";
import { ResourceDepositKind } from "~/types/build/resource-deposit";
import { RegionKind } from "~/types/build/region";

export type ResourceContainer = ResourceKind | ResourceDepositKind | RegionKind;
