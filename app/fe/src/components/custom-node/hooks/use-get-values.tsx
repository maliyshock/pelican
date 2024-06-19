import { useGetCurrentMaxSatiety } from "~/components/custom-node/hooks/use-get-current-max-satiety.ts";
import { GameNodeData } from "@pelican/constants";
import { ReactNode, useMemo } from "react";
import { HealthIndicator } from "~/components/custom-node/components/health-indicator.tsx";
import { DmgIndicator } from "~/components/custom-node/components/dmg-indicator.tsx";
import { SatietyIndicator } from "~/components/custom-node/components/satiety-indicator.tsx";

export function useGetValues(data: GameNodeData) {
  const maxSatiety = useGetCurrentMaxSatiety(data.profile?.digestion);
  const { health, maxHealth } = data;

  return useMemo(() => {
    const result: ReactNode[] = [];

    if (data.profile?.digestion && maxSatiety) {
      const { satiety } = data.profile.digestion;

      result.push(<SatietyIndicator key="SatietyIndicator" max={maxSatiety} value={satiety} />);
    }

    if (data.dmg) result.push(<DmgIndicator key="DmgIndicator" value={data.dmg} />);
    if (health && maxHealth) result.push(<HealthIndicator key="HealthIndicator" max={maxHealth} value={health} />);

    return result;
  }, [data.dmg, data.profile?.digestion, health, maxHealth, maxSatiety]);
}
