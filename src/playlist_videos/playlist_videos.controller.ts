import { Controller, Get, Post, Body, Patch, Param, Delete , Query } from '@nestjs/common';
import { PlaylistVideosService } from './playlist_videos.service';
import { CreatePlaylistVideoDto } from './dto/create-playlist_video.dto';
import { UpdatePlaylistVideoDto } from './dto/update-playlist_video.dto';

@Controller('playlist_videos')
export class PlaylistVideosController {
  constructor(private readonly playlistVideosService: PlaylistVideosService) {}

  @Post()
  create(@Body() createPlaylistVideoDto: CreatePlaylistVideoDto) {
    return this.playlistVideosService.create(createPlaylistVideoDto);
  }

  @Get()
  findAll() {
    return this.playlistVideosService.findAll();
  }

  @Get('search')
  async searchVideos(@Query() query: any) {
    try {
      const result = await this.playlistVideosService.searchPlaylist(query);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: 'Erro ao buscar dados.' };
    }
  }

  @Get(':videoId/:playlistId')
  findOne(@Param('videoId') videoId: string, @Param('playlistId') playlistId: string) {
    return this.playlistVideosService.findOne(videoId, playlistId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaylistVideoDto: UpdatePlaylistVideoDto) {
    return this.playlistVideosService.update(+id, updatePlaylistVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistVideosService.remove(+id);
  }
}
