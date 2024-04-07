import { Action } from "~/types";
import { Compass, Grab } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/store";
import { setAction } from "~/slices/actions.ts";

interface ActionsProps {
  actionsList: Action[];
  source: string;
  target: string;
}

function getIcon(action: Action) {
  if (action === "explore") return <Compass />;
  if (action === "harvest") return <Grab />;
}

const cutoff = 1;

export function Actions({ actionsList, target }: ActionsProps) {
  const dispatch = useDispatch();
  const actions = useSelector((state: RootState) => state.actions);

  useEffect(() => {
    if (actionsList.length === cutoff && !actions[target]) {
      const action = actionsList[0];

      dispatch(setAction({ target, actionName: action }));
    }
  }, [actions, actionsList, dispatch, target]);

  return (
    <>
      {actionsList.length > cutoff &&
        actionsList.map(item => (
          <button disabled={!!actions[target]} className="button" onClick={() => !actions[target] && dispatch(setAction({ target, actionName: item }))}>
            {getIcon(item)}
          </button>
        ))}
    </>
  );
}
