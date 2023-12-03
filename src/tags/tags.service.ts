import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TagEntity } from './entities/tag.entity';

@Injectable()
export class TagsService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createTagDto: CreateTagDto):Promise<TagEntity> {
    return this.prisma.tags.create({
      data:createTagDto,
    });
  }

  async findAll():Promise<TagEntity[]> {
    return await this.prisma.tags.findMany();;
  }

  async findOne(id: any):Promise<TagEntity> {
    return this.prisma.tags.findUnique({
      where:{
        id,
      },
    })
  }

  async update(id: any, updateTagDto: UpdateTagDto):Promise<TagEntity> {
    return this.prisma.tags.update({
      where: {
        id,
      },
      data: updateTagDto,
    });
  }

  async remove(id: any):Promise<TagEntity> {
    return this.prisma.tags.delete({
      where:{
        id,
      },
    })
  }
}
