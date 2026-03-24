import { PrismaModule } from "./prisma.module";
import { PrismaService } from "./prisma.service";
import {
  PrismaClient,
  Prisma as PrismaTypes,
  $Enums as PrismaEnums,
} from "./generated/client/client";
import type * as PrismaModels from "./generated/client/models";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

export {
  PrismaClient,
  PrismaModule,
  PrismaService,
  PrismaEnums,
  PrismaTypes,
  PrismaModels,
};
