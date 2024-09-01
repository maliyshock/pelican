import { useGetCurrentMaxSatiety } from "~/components/custom-node/hooks/use-get-current-max-satiety.ts";
import { GameNodeData } from "@pelican/constants";
import { ReactNode, useCallback, useMemo } from "react";
import { Satiety } from "~/components/ui/indicators/satiety.tsx";
import { Dmg } from "~/components/ui/indicators/dmg.tsx";
import { Hp } from "~/components/ui/indicators/hp.tsx";
import { Price } from "~/components/ui/indicators/price.tsx";
import useStore from "~/store/use-store.ts";
import { useReactFlow } from "@xyflow/react";

export function useGetValues(data: GameNodeData, id?: string) {
  const maxSatiety = useGetCurrentMaxSatiety(data.profile?.digestion);
  const { health, maxHealth } = data;
  const isPlayer = data.roles.includes("player");
  const { addMoney } = useStore(store => store.money);
  const { deleteElements } = useReactFlow();

  const handleSell = useCallback(async () => {
    if (data.price && id) {
      await deleteElements({ nodes: [{ id }] });
      addMoney(data.price);
    }
  }, [addMoney, data.price, deleteElements, id]);

  return useMemo(() => {
    const result: ReactNode[] = [];

    if (data.price !== undefined) {
      result.push(<Price key="price-indicator" value={data.price} onClick={handleSell} />);
    }

    if (data.fire) {
      const { amount } = data.fire;

      result.push(<Dmg key="fire-indicator" value={amount} />);
    }

    if (data.profile?.digestion && maxSatiety) {
      const { satiety, maxSatiety } = data.profile.digestion;

      result.push(<Satiety key="satiety-indicator" max={maxSatiety} value={satiety} />);
    }

    if (data.dmg) {
      result.push(<Dmg key="dmg-indicator" value={data.dmg} />);
    }

    if (data.health) {
      result.push(<Hp simple={!isPlayer} key="hp-indicator" value={data.health} max={maxHealth! || health!} />);
    }

    return result;
  }, [data.dmg, data.fire, data.health, data.profile?.digestion, health, isPlayer, maxHealth, maxSatiety]);
}
