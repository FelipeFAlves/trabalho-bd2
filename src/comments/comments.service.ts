import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentsService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto):Promise<CommentEntity> {
    return this.prisma.comments.create({
      data:createCommentDto,
    });
  }

  async findAll():Promise<CommentEntity[]> {
    return await this.prisma.comments.findMany();
  }

  async findOne(id: any):Promise<CommentEntity> {
    return this.prisma.comments.findUnique({
      where:{
        id,
      },
    })
  }

  async update(id: any, updateCommentDto: UpdateCommentDto):Promise<CommentEntity> {
    return this.prisma.comments.update({
      where: {
        id,
      },
      data: updateCommentDto,
    });
  }

  async remove(id: any):Promise<CommentEntity> {
    return this.prisma.comments.delete({
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
      const result = await this.prisma.comments.findMany({
        where: whereConditions,
        select: {
          id: query.filterAttributes.includes('id'),
          videoId: query.filterAttributes.includes('videoId'),
          publishedAt: query.filterAttributes.includes('publishedAt'),
          topLevelCommentId: query.filterAttributes.includes('topLevelCommentId'),
          channelId: query.filterAttributes.includes('channelId'),
          textDisplay: query.filterAttributes.includes('textDisplay'),
          textOriginal: query.filterAttributes.includes('textOriginal'),
          authorNameDisplay: query.filterAttributes.includes('authorNameDisplay'),
          authorProfileImageUrl: query.filterAttributes.includes('authorProfileImageUrl'),
          authorChannelUrl: query.filterAttributes.includes('authorChannelUrl'),
          canRate: query.filterAttributes.includes('canRate'),
          viewerRating: query.filterAttributes.includes('viewerRating'),
          likeCount: query.filterAttributes.includes('likeCount'),
          updatedAt: query.filterAttributes.includes('updatedAt'),
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
