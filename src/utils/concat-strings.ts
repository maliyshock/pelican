export function concatStrings(sourceString: string, joinerString: string, symbol?: string) {
  return sourceString + (sourceString.length > 0 && symbol ? symbol : "") + joinerString;
}
