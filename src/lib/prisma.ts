// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = globalThis as unknown as {
//   prismaClient: PrismaClient | undefined;
// };

// export const prismaClient = globalForPrisma.prismaClient ?? new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalForPrisma.prismaClient = prismaClient;

// =============================================================================================================================================

import { PrismaClient } from "@prisma/client";

const prismaGlobal = global as typeof global & {
  prisma?: PrismaClient;
};

const NODE_ENV = process.env.NODE_ENV;

export const prisma: PrismaClient =
  prismaGlobal.prisma ??
  new PrismaClient({
    log: NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (NODE_ENV !== "production") {
  prismaGlobal.prisma = prisma;
}
