import { PrismaClient } from "@prisma/client";

declare global {
  // This tells TS that `global` can have `prisma`
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// No adapter, no PrismaPg in Prisma v6
export const prisma =
  global.prisma ??
  new PrismaClient({
    log: ["error", "warn"], // You can also add "query" if needed
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
