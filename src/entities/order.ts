export interface Order {
  readonly id: string;
  readonly value: number;
  readonly trade: string;
  readonly symbol: string;
  readonly profileId: string;
  readonly profileName: string;
  readonly createdAt: Date;
}
