import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { PrismaService } from 'src/prisma.service';
import { ReactionEntity } from './entities/reaction.entity';
import GenerateUniqueId, { IdType } from 'src/utils/generateUniqueId';
import { reactionType } from '@prisma/client';

@Injectable()
export class ReactionService {
  constructor(private prisma: PrismaService) {}

  async createReaction(
    createReactionDto: CreateReactionDto,
  ): Promise<ReactionEntity> {
    const exists = await this.prisma.reaction.findFirst({
      where: {
        postId: createReactionDto.postId,
        userId: createReactionDto.userId,
      },
    });
    if (exists) {
      throw new ConflictException();
    }
    const created = await this.prisma.reaction.create({
      data: {
        id: GenerateUniqueId(IdType.REACTION_ID),
        ...createReactionDto,
      },
    });
    if (!created) {
      throw new InternalServerErrorException();
    }
    return created;
  }

  async getPostReactionsCount(id: string): Promise<number> {
    return await this.prisma.reaction.count({
      where: {
        postId: id,
      },
    });
  }

  async getPostReactionsCountByType(
    id: string,
    type: reactionType,
  ): Promise<number> {
    return await this.prisma.reaction.count({
      where: {
        postId: id,
        type: type,
      },
    });
  }

  async getUserAllReactionsCount(id: string): Promise<number> {
    return await this.prisma.reaction.count({
      where: {
        userId: id,
      },
    });
  }
}
