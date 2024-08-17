import { Compass, Grab, Hammer } from "lucide-react";
import { useEffect } from "react";
import { ActionKind } from "@pelican/constants";
import useStore from "~/store/use-store.ts";
import { Button } from "antd";

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

export function Actions({ actionsList, target, source }: ActionsProps) {
  const { setActions, items: actions } = useStore(store => store.actions);

  // if there is only 1 action trigger it by default
  useEffect(() => {
    if (actionsList.length === 1) {
      const action = actionsList[0];

      setActions([{ target, source, actionName: action }]);
    }
  }, [actionsList, setActions, source, target]);

  return (
    <>
      {actionsList.length > 1 &&
        actionsList.map(item => (
          <Button
            key={`${target}_${item}`}
            className="button"
            disabled={!!actions[target]}
            size="large"
            onClick={() => !actions[target] && setActions([{ target, source, actionName: item }])}
            onMouseDown={e => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {item} {getIcon(item)}
          </Button>
        ))}
    </>
  );
}
