import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { cmdIsPressed } from "../slices/cmd-is-pressed.ts";

export function useKeyListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey) {
        dispatch(cmdIsPressed(true));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Meta") {
        dispatch(cmdIsPressed(false));
      }
    };

    // Add event listeners for keydown and keyup
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [dispatch]);

  return;
}
