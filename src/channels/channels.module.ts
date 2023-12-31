import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';

@Module({
  controllers: [ChannelsController],
  providers: [ChannelsService,PrismaService],
})
export class ChannelsModule {}
