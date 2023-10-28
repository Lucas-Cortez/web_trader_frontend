import { Strategy } from "@/entities/strategy";
import { IUseCase } from "../contracts/IUsecase";
import { prisma } from "@/lib/prisma";

export class GetAllStrategiesUseCase implements IUseCase<void, Strategy[]> {
  async execute(): Promise<Strategy[]> {
    return await prisma.strategy.findMany();
  }
}
