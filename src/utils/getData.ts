import data from "../data.json";

export function getData<T>(): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(data as T), 500));
}
