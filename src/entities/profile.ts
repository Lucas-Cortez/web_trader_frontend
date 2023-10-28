// export class Profile {
//   constructor(
//     public readonly id: string,
//     public readonly name: string,
//     public readonly interval: string,
//     public readonly symbol: string,
//     public readonly strategiesIds: string[],
//     public readonly quantity: number,
//     public readonly lastOrder?: Date,
//   ) {}
// }

export interface Profile {
  readonly id: string;
  readonly name: string;
  readonly interval: string;
  readonly symbol: string;
  readonly inPosition: boolean;
  readonly strategiesIds: string[];
  readonly quantity: number;
  readonly lastOrder?: Date;
}
