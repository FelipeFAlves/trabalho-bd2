import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { VideoEntity } from './entities/video.entity';
import { Prisma } from '@prisma/client';

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

  async searchVideos(query: any): Promise<any> {
    try {
      console.log('Recebendo consulta com os seguintes parâmetros:', query);
      let inputValuesObject;
      let whereConditions: any = {}; // Inicializa um objeto vazio para as condições where
      let orderByField;
      let orderByDirection;
  
      // Se houver atributos selecionados, construa a cláusula where
      if (query.filterAttributes.length > 0) {
        const attributesArray = query.filterAttributes.split(','); // Converte a string em um array
        console.log('String:', query.filterAttributes);
        console.log('Array:', attributesArray);
        console.log('values:', query.inputValues);
        inputValuesObject = JSON.parse(query.inputValues);

        console.log('values:', inputValuesObject);
        
        if(query.conditional==='and'){
          whereConditions = {
            AND: attributesArray.map((attr: string) => ({
              [attr]: {
                equals: inputValuesObject[attr], // Adapte conforme necessário
              },
            })),
          };
        }
        else{
          whereConditions = {
            OR: attributesArray.map((attr: string) => ({
                [attr]: {
                    equals: inputValuesObject[attr], // Adapte conforme necessário
                },
            })),
          };
        }
        
      }
      
      
      if (query.selectedAttributes.length > 0) {
        const selectedAttributes = query.selectedAttributes.split(','); // Convertendo para array
        console.log('Select:', selectedAttributes);

        if(query.conditional==='and'){
          selectedAttributes.forEach((selectedAttribute: string) => {
            whereConditions = {
                ...whereConditions,
                [selectedAttribute]: {
                    equals: inputValuesObject[selectedAttribute],
                },
            };
        });

        }
        else{
          selectedAttributes.forEach((selectedAttribute: string) => {
            whereConditions = {
              ...whereConditions,
              OR: [
                  ...(whereConditions.OR || []),
                  {
                      [selectedAttribute]: {
                          equals: inputValuesObject[selectedAttribute],
                      },
                  },
              ],
          };
        });
        }

        orderByField = query.selectedReturnAttribute;
        orderByDirection = query.orderBy.toLowerCase(); // Convert
        // Se ambos existirem, aplicamos à consulta
    console.log('field:', orderByField);
    console.log('opaaa String:', orderByDirection);
      }

      
      // Exemplo básico de consulta
      const result = await this.prisma.videos.findMany({
        where: whereConditions,
        select: {
          id: query.filterAttributes.includes('id'),
          title: query.filterAttributes.includes('title'),
          description: query.filterAttributes.includes('description'),
          publishedAt: query.filterAttributes.includes('publishedAt'),
          channelId: query.filterAttributes.includes('channelId'),
          shortId: query.filterAttributes.includes('shortId'),
        },
        orderBy: orderByDirection !== 'none' ? { [orderByField]: orderByDirection } : undefined,
        
        take: parseInt(query.limit) || undefined,
      });
      console.log('Resultado da consulta:', result);
  
      return result;
    } catch (error) {
      throw new Error('Erro ao buscar dados.');
    }
}
}