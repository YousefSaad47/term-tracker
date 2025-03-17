import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const isDev = process.env.NODE_ENV === 'development';

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient(
    isDev
      ? {
          log: ['query', 'error', 'warn'],
        }
      : undefined
  );

if (isDev) globalForPrisma.prisma = prisma;
