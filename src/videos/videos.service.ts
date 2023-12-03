import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { VideoEntity } from './entities/video.entity';

@Injectable()
export class VideosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVideoDto: CreateVideoDto): Promise<VideoEntity> {
    return this.prisma.videos.create({
      data:createVideoDto,
    });
  }

  async findAll(): Promise<VideoEntity[]> {
    return await this.prisma.videos.findMany();
  }

  async findOne(id: any): Promise<VideoEntity> {
    return this.prisma.videos.findUnique({
      where:{
        id,
      },
    }) 
  }

  async update(id: any, updateVideoDto: UpdateVideoDto): Promise<VideoEntity> {
    return this.prisma.videos.update({
      where: {
        id,
      },
      data: updateVideoDto,
    });
  }

  async remove(id: any): Promise<VideoEntity> {
    return this.prisma.videos.delete({
      where:{
        id,
      },
    })
  }
}
