import { useGetCurrentMaxSatiety } from "~/components/custom-node/hooks/use-get-current-max-satiety.ts";
import { GameNodeData } from "@pelican/constants";
import { ReactNode, useMemo } from "react";
import { Sword } from "~/components/ui/icons/sword.tsx";
import { Satiety } from "~/components/ui/indicators/satiety.tsx";
import { Dmg } from "~/components/ui/indicators/dmg.tsx";
import { Hp } from "~/components/ui/indicators/hp.tsx";

export function useGetValues(data: GameNodeData) {
  const maxSatiety = useGetCurrentMaxSatiety(data.profile?.digestion);
  const { health, maxHealth } = data;
  const isPlayer = data.roles.includes("player");

  return useMemo(() => {
    const result: ReactNode[] = [];

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
      result.push(<Hp key="hp-indicator" value={data.health} max={maxHealth! || health!} />);
    }

    return result;
  }, [data.dmg, data.fire, data.health, data.profile?.digestion, health, isPlayer, maxHealth, maxSatiety]);
}
