import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';

@Module({
  controllers: [PlaylistsController],
  providers: [PlaylistsService,PrismaService],
})
export class PlaylistsModule {}
