import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { BrandingsService } from './brandings.service';
import { BrandingsController } from './brandings.controller';

@Module({
  controllers: [BrandingsController],
  providers: [BrandingsService,PrismaService],
})
export class BrandingsModule {}
