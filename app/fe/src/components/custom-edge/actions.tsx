import { Action } from "../../../../common/src/types";
import { Compass, Grab, Hammer } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { removeAction, setActions } from "../../slices/actions.ts";
import { CRAFTING, EXPLORING, HARVESTING } from "../../../../common/constants/dictionary.ts";

interface ActionsProps {
  actionsList: Action[];
  source: string;
  target: string;
}

function getIcon(action: Action) {
  if (action === EXPLORING) return <Compass />;
  if (action === HARVESTING) return <Grab />;
  if (action === CRAFTING) return <Hammer />;
}

const cutoff = 1;

export function Actions({ actionsList, target }: ActionsProps) {
  const dispatch = useDispatch();
  const actions = useSelector((state: RootState) => state.actions);

  // if there is only 1 action trigger it by default
  useEffect(() => {
    if (actionsList.length === cutoff && !actions[target]) {
      const action = actionsList[0];

      dispatch(setActions([{ target, actionName: action }]));
    }
  }, [actions, actionsList, dispatch, target]);

  useEffect(() => {
    return () => {
      dispatch(removeAction({ target }));
    };
  }, [dispatch, target]);

  return (
    <>
      {actionsList.length > cutoff &&
        actionsList.map(item => (
          <button
            key={`${target}_${item}`}
            className="button"
            disabled={!!actions[target]}
            onClick={() => !actions[target] && dispatch(setActions([{ target, actionName: item }]))}
          >
            {item} {getIcon(item)}
          </button>
        ))}
    </>
  );
}
