export interface ItemFilter {
  _id?: number;
  type?: string;
  name?: string;
  rarity?: string;
  maxLevel?: number;
  minLevel?: number;
  minBuy?: number;
  maxBuy?: number;
  minSell?: number;
  maxSell?: number;
  minSupply?: number;
  maxSupply?: number;
  minDemand?: number;
  maxDemand?: number;
  minProfit?: number;
  maxProfit?: number;
  minROI?: number;
  maxROI?: number;
  minSUC?: number;
  maxSUC?: number;
  minBUC?: number;
  maxBUC?: number;
  limit?: number;
}
