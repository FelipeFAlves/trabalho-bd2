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
}
