export interface Profile {
  readonly id: string;
  readonly name: string;
  readonly interval: string;
  readonly symbol: string;
  readonly inPosition: boolean;
  readonly strategiesIds: string[];
  readonly quantity: number;
  readonly lastOrderTime?: Date;
  readonly lastOrderClosingPrice?: number;
  readonly stopLoss: number;
  readonly stopEnable: boolean;
  readonly version: number;
}
