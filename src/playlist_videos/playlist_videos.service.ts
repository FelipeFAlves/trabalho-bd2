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
      const result = await this.prisma.playlist_videos.findMany({
        where: whereConditions,
        select: {
          videoId: query.filterAttributes.includes('videoId'),
          playlistId: query.filterAttributes.includes('playlistId'),
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
