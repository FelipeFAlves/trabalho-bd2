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


  async searchPlaylist(query: any): Promise<any> {
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
      const result = await this.prisma.playlists.findMany({
        where: whereConditions,
        select: {
          id: query.filterAttributes.includes('id'),
          title: query.filterAttributes.includes('title'),
          description: query.filterAttributes.includes('description'),
          publishedAt: query.filterAttributes.includes('publishedAt'),
          defaultLanguage: query.filterAttributes.includes('defaultLanguage'),
          channelId: query.filterAttributes.includes('channelId'),
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
