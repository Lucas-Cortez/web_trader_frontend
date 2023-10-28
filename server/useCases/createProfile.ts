import { Profile } from "@/entities/profile";
import { IUseCase } from "../contracts/IUsecase";
import { AppError } from "../errors/appError";
import { prisma } from "@/lib/prisma";

type CreateProfileInput = {
  name: string;
  interval: string;
  symbol: string;
  quantity: number;
  strategiesIds: string[];
  userId: string;
};

export class CreateProfileUseCase implements IUseCase<CreateProfileInput, Profile> {
  async execute(input: CreateProfileInput): Promise<Profile> {
    const { strategiesIds, ...restProfile } = input;

    const profiles = await prisma.profile.count({ where: { userId: restProfile.userId } });

    if (profiles >= 3) throw new AppError({ statusCode: 406, message: "3 profiles allowed" });

    const data = await prisma.profile.create({
      data: {
        ...restProfile,
        profilestrategy: {
          createMany: { data: [...strategiesIds.map((id) => ({ strategyId: id }))] },
        },
      },
      include: { profilestrategy: true },
    });

    return {
      id: data.id,
      interval: data.interval,
      name: data.name,
      quantity: data.quantity,
      symbol: data.symbol,
      strategiesIds: data.profilestrategy.map((v) => v.strategyId),
    };
  }
}
