export interface Profile {
  readonly id: string;
  readonly name: string;
  readonly interval: string;
  readonly symbol: string;
  readonly inPosition: boolean;
  readonly strategiesIds: string[];
  readonly quantity: number;
  readonly lastOrder?: Date;
  readonly stopLoss: number;
  readonly stopEnable: boolean;
}
