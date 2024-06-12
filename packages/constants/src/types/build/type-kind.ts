import {BuildingKind} from "./building"
import {CharacterKind} from "./character"
import {PlayerKind} from "./player"
import {FoodKind} from "./food"
import {IngredientKind} from "./ingredient"
import {FertilizerKind} from "./fertilizer"
import {ResourceKind} from "./resource"
import {RegionKind} from "./region"
import {ResourceDepositKind} from "./resource-deposit"

export type TypeKind = BuildingKind | CharacterKind | PlayerKind | FoodKind | IngredientKind | FertilizerKind | ResourceKind | RegionKind | ResourceDepositKind;