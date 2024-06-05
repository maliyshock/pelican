export function createSocket(limit) {
  return { ...(limit ? { limit } : {}) };
}
