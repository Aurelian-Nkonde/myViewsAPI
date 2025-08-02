import { reactionType } from '@prisma/client';

export class ReactionEntity {
  id: string;
  postId: string;
  userId: string;
  type: reactionType;
  createdAt: Date;
  updatedAt: Date;
}
