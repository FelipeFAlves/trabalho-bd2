import { Injectable } from '@nestjs/common';
import { CreatePlaylistVideoDto } from './dto/create-playlist_video.dto';
import { UpdatePlaylistVideoDto } from './dto/update-playlist_video.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { playlist_videos } from '@prisma/client';

@Injectable()
export class PlaylistVideosService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createPlaylistVideoDto: CreatePlaylistVideoDto):Promise<playlist_videos> {
    return this.prisma.playlist_videos.create({
      data:createPlaylistVideoDto,
    });
  }

  async findAll():Promise<playlist_videos[]> {
    return await this.prisma.playlist_videos.findMany();
  }

  async findOne(videoId: string, playlistId: string): Promise<playlist_videos | null> {
    try {
      const result = await this.prisma.playlist_videos.findFirst({
        where: {
          videoId,
          playlistId,
        },
      });
      return result;
    } catch (error) {
      // Lide com o erro aqui
      console.error('Erro ao buscar dados:', error);
      throw new Error('Erro ao buscar dados.');
    }
  }

  async update(id: any, updatePlaylistVideoDto: UpdatePlaylistVideoDto)
  // :Promise<playlist_videos> 
  {
    // return this.prisma.playlist_videos.update({
    //   where: {
    //     id,
    //   },
    //   data: updatePlaylistVideoDto,
    // });
    return "erro nesse tbm"
  }

  async remove(id: any)
  // :Promise<playlist_videos> 
  {
    // return this.prisma.comments.delete({
    //   where:{
    //     id,
    //   },
    // })
    return "Outro erro..."
  }

  
}
