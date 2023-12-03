import { Injectable } from '@nestjs/common';
import { CreateThumbnailDto } from './dto/create-thumbnail.dto';
import { UpdateThumbnailDto } from './dto/update-thumbnail.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ThumbnailEntity } from './entities/thumbnail.entity';

@Injectable()
export class ThumbnailsService {

  constructor(private readonly prisma: PrismaService) {}
  
  async create(createThumbnailDto: CreateThumbnailDto):Promise<ThumbnailEntity> {
    return this.prisma.thumbnails.create({
      data:createThumbnailDto,
    });
  }

  async findAll():Promise<ThumbnailEntity[]> {
    return await this.prisma.thumbnails.findMany();
  }

  async findOne(id: any):Promise<ThumbnailEntity> {
    return this.prisma.thumbnails.findUnique({
      where:{
        id,
      },
    })
  }

  async update(id: any, updateThumbnailDto: UpdateThumbnailDto):Promise<ThumbnailEntity> {
    return this.prisma.thumbnails.update({
      where: {
        id,
      },
      data: updateThumbnailDto,
    });
  }

  async remove(id: any):Promise<ThumbnailEntity> {
    return this.prisma.thumbnails.delete({
      where:{
        id,
      },
    })
  }
}
