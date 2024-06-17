import { Compass, Grab, Hammer } from "lucide-react";
import { useEffect } from "react";
import { ActionKind } from "@pelican/constants";
import useStore from "~/store/use-store.ts";

interface ActionsProps {
  actionsList: ActionKind[];
  source: string;
  target: string;
}

function getIcon(action: ActionKind) {
  if (action === "explore") return <Compass />;
  if (action === "harvest") return <Grab />;
  if (action === "craft") return <Hammer />;
}

const cutoff = 1;

export function Actions({ actionsList, target, source }: ActionsProps) {
  const removeAction = useStore(store => store.removeAction);
  const setActions = useStore(store => store.setActions);
  const actions = useStore(store => store.actions);

  // if there is only 1 action trigger it by default
  useEffect(() => {
    if (actionsList.length === cutoff && !actions[target]) {
      const action = actionsList[0];

      setActions([{ target, source, actionName: action }]);
    }
  }, [actions, actionsList, setActions, source, target]);

  useEffect(() => {
    return () => {
      removeAction(target);
    };
  }, [removeAction, target]);

  return (
    <>
      {actionsList.length > cutoff &&
        actionsList.map(item => (
          <button
            key={`${target}_${item}`}
            className="button"
            disabled={!!actions[target]}
            onClick={() => !actions[target] && setActions([{ target, source, actionName: item }])}
          >
            {item} {getIcon(item)}
          </button>
        ))}
    </>
  );
}
