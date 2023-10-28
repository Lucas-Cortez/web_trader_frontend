import { Profile } from "@/entities/profile";
import { IUseCase } from "../contracts/IUsecase";
import { prisma } from "@/lib/prisma";

type GetProfilesInput = { userId: string };
type GetProfilesOutput = Profile[];

export class GetProfilesUseCase implements IUseCase<GetProfilesInput, GetProfilesOutput> {
  async execute(input: GetProfilesInput): Promise<GetProfilesOutput> {
    const data = await prisma.profile.findMany({
      where: { userId: input.userId },
      include: { profilestrategy: true },
    });

    return data.map((v) => ({
      id: v.id,
      interval: v.interval,
      name: v.name,
      quantity: v.quantity,
      symbol: v.symbol,
      strategiesIds: v.profilestrategy.map((v) => v.strategyId),
    }));
  }
}
