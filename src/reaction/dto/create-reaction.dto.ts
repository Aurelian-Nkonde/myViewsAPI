import { reactionType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateReactionDto {
  @IsNotEmpty()
  @IsString()
  @Length(18)
  postId: string;

  @IsNotEmpty()
  @IsString()
  @Length(10)
  userId: string;

  @IsNotEmpty()
  @IsEnum(reactionType)
  type: reactionType;
}
