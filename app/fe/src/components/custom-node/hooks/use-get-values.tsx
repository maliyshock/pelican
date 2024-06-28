import { useGetCurrentMaxSatiety } from "~/components/custom-node/hooks/use-get-current-max-satiety.ts";
import { GameNodeData } from "@pelican/constants";
import { ReactNode, useMemo } from "react";
import { Meat } from "~/components/ui/icons/meat.tsx";
import { Sword } from "~/components/ui/icons/sword.tsx";
import { Heart } from "~/components/ui/icons/heart.tsx";
import { CardIndicator } from "~/components/ui/card/indicator/card-indicator.tsx";

export function useGetValues(data: GameNodeData) {
  const maxSatiety = useGetCurrentMaxSatiety(data.profile?.digestion);
  const { health, maxHealth } = data;
  const isPlayer = data.roles.includes("player");

  return useMemo(() => {
    const result: ReactNode[] = [];

    if (data.fire) {
      const { amount, max } = data.fire;

      result.push(
        <CardIndicator
          key="dmg-indicator"
          className="bottom-left dmg-indicator"
          decor={isPlayer ? <Sword /> : undefined}
          strokeColor="#BD381A"
          trailColor="#CB9A8F"
          type="dmg"
          value={amount}
        />,
      );
    }

    if (data.profile?.digestion && maxSatiety) {
      const { satiety } = data.profile.digestion;

      result.push(
        <CardIndicator
          key="satiety-indicator"
          className="top-left"
          decor={isPlayer ? <Meat /> : undefined}
          max={maxSatiety}
          strokeColor="#BD381A"
          trailColor="#CB9A8F"
          type="satiety"
          value={satiety}
        />,
      );
    }

    if (data.dmg) {
      result.push(
        <CardIndicator
          key="dmg-indicator"
          className="bottom-left dmg-indicator"
          decor={isPlayer ? <Sword /> : undefined}
          strokeColor="#BD381A"
          trailColor="#CB9A8F"
          type="dmg"
          value={data.dmg}
        />,
      );
    }

    if (data.health) {
      result.push(
        <CardIndicator
          key="health-indicator"
          className="bottom-right health-indicator"
          decor={isPlayer ? <Heart /> : undefined}
          max={maxHealth || health}
          strokeColor="#FF6C6C"
          trailColor="#FFD2D2"
          type="health"
          value={data.health}
        />,
      );
    }

    return result;
  }, [data.dmg, data.fire, data.health, data.profile?.digestion, health, isPlayer, maxHealth, maxSatiety]);
}
