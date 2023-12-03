import { Injectable } from '@nestjs/common';
import { CreateBrandingDto } from './dto/create-branding.dto';
import { UpdateBrandingDto } from './dto/update-branding.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BrandingEntity } from './entities/branding.entity';

@Injectable()
export class BrandingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBrandingDto: CreateBrandingDto):Promise<BrandingEntity> {
    return this.prisma.brandings.create({
      data:createBrandingDto,
    });
  }

  async findAll():Promise<BrandingEntity[]> {
    return await this.prisma.brandings.findMany();
  }

  async findOne(id: any):Promise<BrandingEntity> {
    return this.prisma.brandings.findUnique({
      where:{
        id,
      },
    }) 
  }

  async update(id: any, updateBrandingDto: UpdateBrandingDto):Promise<BrandingEntity> {
    return this.prisma.brandings.update({
      where: {
        id,
      },
      data: updateBrandingDto,
    });
  }

  async remove(id: any):Promise<BrandingEntity> {
    return this.prisma.brandings.delete({
      where:{
        id,
      },
    })
  }
}
