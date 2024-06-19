export function getCurrentMaxSatiety(originalMaxSatiety: number, hungerStack: number) {
  if (hungerStack === 0) return originalMaxSatiety;

  return Math.round(originalMaxSatiety / (hungerStack + 1));
}
