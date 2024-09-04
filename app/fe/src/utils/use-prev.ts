import { useEffect, useRef } from "react";

interface PreviousValue<T> {
  value: T;
  time: Date;
}

export function usePrevious<T>(value: T): PreviousValue<T> | undefined {
  const ref = useRef<PreviousValue<T>>({ value: undefined, time: new Date() });

  useEffect(() => {
    ref.current = { value, time: new Date() };
  });

  return ref.current;
}
