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
  async findAll(queryParams: any): Promise<VideoEntity[]> {
    const where: any = {}; // Objeto que armazenará as condições de pesquisa
  
    if (queryParams.id) {
      where.id = queryParams.id;
    }
  
    if (queryParams.channelId) {
      where.channelId = queryParams.channelId;
    }
  
    if (queryParams.title) {
      where.title = queryParams.title;
    }
  
    if (queryParams.description) {
      where.description = queryParams.description;
    }
  
    if (queryParams.shortId) {
      where.shortId = queryParams.shortId;
    }
  
    if (queryParams.publishedAt) {
      where.publishedAt = queryParams.publishedAt;
    }
  
    return this.prisma.videos.findMany({
      where,
    });
  }
  // async findAll(): Promise<VideoEntity[]> {
  //   return await this.prisma.videos.findMany();
  // }

  async findOne(id: any): Promise<VideoEntity> {
    console.log(id);
    return this.prisma.videos.findFirst({
      where:{
        id,
      },
    }) 
  }

  async findChannel(channelId: any): Promise<VideoEntity[]> {
    return this.prisma.videos.findMany({
      where:{
        channelId,
      },
    }) 
  }

  async findTitle(title: any): Promise<VideoEntity[]> {
    console.log(title);
    return this.prisma.videos.findMany({
      where:{
        title,
      },
    }) 
  }

  async findDescription(description: any): Promise<VideoEntity[]> {
    console.log(description);
    return this.prisma.videos.findMany({
      where:{
        description,
      },
    }) 
  }

  async findShortId(shortId: any): Promise<VideoEntity[]> {
    console.log(shortId);
    return this.prisma.videos.findMany({
      where:{
        shortId,
      },
    }) 
  }

  async findPubli(publishedAt: any): Promise<VideoEntity[]> {
    console.log(publishedAt);
    return this.prisma.videos.findMany({
      where:{
        publishedAt,
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
