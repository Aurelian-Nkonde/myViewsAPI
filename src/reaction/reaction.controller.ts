import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { ReactionEntity } from './entities/reaction.entity';
import { reactionType } from '@prisma/client';

@Controller('reaction')
export class ReactionController {
  constructor(private readonly reactionService: ReactionService) {}

  @Post()
  async createReaction(
    @Body() createReactionDto: CreateReactionDto,
  ): Promise<ReactionEntity> {
    return await this.reactionService.createReaction(createReactionDto);
  }

  @Get('post/:id')
  async getPostReactionCount(@Param('id') id: string): Promise<number> {
    return await this.reactionService.getPostReactionsCount(id);
  }

  @Get('post/type/:id')
  async getPostReactionCountByType(
    @Param('id') id: string,
    @Body('type') type: reactionType,
  ): Promise<number> {
    return await this.reactionService.getPostReactionsCountByType(id, type);
  }

  @Get('post/user/all/:id')
  async getAllUserPostReactionCount(@Param('id') id: string): Promise<number> {
    return await this.reactionService.getUserAllReactionsCount(id);
  }
}
