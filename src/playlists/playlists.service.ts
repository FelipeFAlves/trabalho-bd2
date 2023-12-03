import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PlaylistEntity } from './entities/playlist.entity';

@Injectable()
export class PlaylistsService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createPlaylistDto: CreatePlaylistDto):Promise<PlaylistEntity> {
    return this.prisma.playlists.create({
      data:createPlaylistDto,
    });
  }

  async findAll():Promise<PlaylistEntity[]> {
    return await this.prisma.playlists.findMany();
  }

  async findOne(id: any):Promise<PlaylistEntity> {
    return this.prisma.playlists.findUnique({
      where:{
        id,
      },
    })
  }

  async update(id: any, updatePlaylistDto: UpdatePlaylistDto):Promise<PlaylistEntity> {
    return this.prisma.playlists.update({
      where: {
        id,
      },
      data: updatePlaylistDto,
    });
  }

  async remove(id: any):Promise<PlaylistEntity> {
    return this.prisma.playlists.delete({
      where:{
        id,
      },
    })
  }
}
