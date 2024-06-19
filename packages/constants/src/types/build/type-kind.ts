import {BuildingKind} from "./building"
import {CharacterKind} from "./character"
import {FoodKind} from "./food"
import {IngredientKind} from "./ingredient"
import {FertilizerKind} from "./fertilizer"
import {ResourceKind} from "./resource"
import {PlayerKind} from "./player"
import {RegionKind} from "./region"
import {ResourceDepositKind} from "./resource-deposit"

export type TypeKind = BuildingKind | CharacterKind | FoodKind | IngredientKind | FertilizerKind | ResourceKind | PlayerKind | RegionKind | ResourceDepositKind;