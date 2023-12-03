import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideosModule } from './videos/videos.module';
import { BrandingsModule } from './brandings/brandings.module';
import { ChannelsModule } from './channels/channels.module';
import { CommentsModule } from './comments/comments.module';
import { PlaylistVideosModule } from './playlist_videos/playlist_videos.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { TagsModule } from './tags/tags.module';
import { ThumbnailsModule } from './thumbnails/thumbnails.module';

@Module({
  imports: [ConfigModule.forRoot(), VideosModule, BrandingsModule, ChannelsModule, CommentsModule, PlaylistVideosModule, PlaylistsModule, TagsModule, ThumbnailsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
