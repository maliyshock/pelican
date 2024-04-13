export function getProgress(elapsedTime: number, time: number) {
  return (elapsedTime / time) * 100;
}
