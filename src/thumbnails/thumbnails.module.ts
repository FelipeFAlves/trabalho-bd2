import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { ThumbnailsService } from './thumbnails.service';
import { ThumbnailsController } from './thumbnails.controller';

@Module({
  controllers: [ThumbnailsController],
  providers: [ThumbnailsService,PrismaService],
})
export class ThumbnailsModule {}
