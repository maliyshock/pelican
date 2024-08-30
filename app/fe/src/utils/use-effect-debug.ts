import { EffectCallback, useEffect, useRef } from "react";

type DependencyChange = {
  name: string;
  prev: any;
  current: any;
};

type Dependencies = Record<string, any>;

export function useEffectDebug(effect: EffectCallback, dependencies: Dependencies) {
  const prevDepsRef = useRef<Dependencies | null>(null);
  const deps: Array<any> = Object.values(dependencies);

  useEffect(() => {
    const prevDeps = prevDepsRef.current;
    const depsEntries = Object.entries(dependencies);

    if (prevDeps) {
      const changedDeps = depsEntries.reduce<DependencyChange[]>((acc, [name, value]) => {
        if (!Object.is(value, prevDeps[name])) {
          acc.push({
            name,
            prev: prevDeps[name],
            current: value,
          });
        }

        return acc;
      }, []);

      if (changedDeps.length) {
        console.log("Changed dependencies:", changedDeps);
      }
    }

    prevDepsRef.current = dependencies;

    return effect();
  }, deps);
}
