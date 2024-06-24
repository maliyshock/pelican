export const MERCHANT = ["fox"] as const;
export type MerchantKind = (typeof MERCHANT)[number];