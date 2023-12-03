import { Module } from '@nestjs/common';
import { PlaylistVideosService } from './playlist_videos.service';
import { PlaylistVideosController } from './playlist_videos.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PlaylistVideosController],
  providers: [PlaylistVideosService,PrismaService],
})
export class PlaylistVideosModule {}
