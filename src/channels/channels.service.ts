import { Injectable } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChannelEntity } from './entities/channel.entity';

@Injectable()
export class ChannelsService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createChannelDto: CreateChannelDto):Promise<ChannelEntity> {
    return this.prisma.channels.create({
      data:createChannelDto,
    });
  }

  async findAll(): Promise<ChannelEntity[]> {
    return await this.prisma.channels.findMany();
  }

  async findOne(id: any):Promise<ChannelEntity> {
    return this.prisma.channels.findUnique({
      where:{
        id,
      },
    }) 
  }

  async update(id: any, updateChannelDto: UpdateChannelDto):Promise<ChannelEntity> {
    return this.prisma.channels.update({
      where: {
        id,
      },
      data: updateChannelDto,
    });
  }

  async remove(id: any):Promise<ChannelEntity> {
    return this.prisma.channels.delete({
      where:{
        id,
      },
    })
  }
}
