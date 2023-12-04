import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(corsMiddleware).forRoutes('*'); // Aplicar o middleware para todas as rotas
  }
}

// Middleware CORS
function corsMiddleware(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); // ou a origem da sua aplicação frontend
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
}
