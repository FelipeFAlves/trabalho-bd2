import { Injectable } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChannelEntity } from './entities/channel.entity';

@Injectable()
export class ChannelsService {

  constructor(private readonly prisma: PrismaService) {}

  // async create(createChannelDto: CreateChannelDto):Promise<ChannelEntity> {
  //   return this.prisma.channels.create({
  //     data:createChannelDto,
  //   });
  // }

  async findAll(): Promise<ChannelEntity[]> {
    const channels = await this.prisma.channels.findMany();
  
    // Converter valores de BigInt para string
    const channelsWithConvertedBigInt = channels.map(channel => ({
      ...channel,
      viewCount: channel.viewCount.toString(),
      subscriberCount: channel.subscriberCount.toString(),
    }));
  
    return channelsWithConvertedBigInt;
  }

  async findOne(id: any): Promise<ChannelEntity | null> {
    try {
      const channel = await this.prisma.channels.findUnique({
        where: {
          id,
        },
      });

      if (!channel) {
        return null;
      }

      // Converter valores de BigInt para string
      const channelWithConvertedBigInt = {
        ...channel,
        viewCount: channel.viewCount.toString(),
        subscriberCount: channel.subscriberCount.toString(),
      };

      return channelWithConvertedBigInt;
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw new Error('Erro ao buscar dados.');
    }
  }

  async searchChannels(query: any): Promise<any> {
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
      const result = await this.prisma.channels.findMany({
        where: whereConditions,
        select: {
          id: query.filterAttributes.includes('id'),
          title: query.filterAttributes.includes('title'),
          description: query.filterAttributes.includes('description'),
          customUrl: query.filterAttributes.includes('customUrl'),
          publishedAt: query.filterAttributes.includes('publishedAt'),
          viewCount: query.filterAttributes.includes('viewCount'),
          subscriberCount: query.filterAttributes.includes('subscriberCount'),
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