import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
declare global {
  // This tells TS that `global` can have `prisma`
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma =
  global.prisma ??
  new PrismaClient({
    adapter,
    log: ["error","warn"],
  });

global.prisma = prisma;
