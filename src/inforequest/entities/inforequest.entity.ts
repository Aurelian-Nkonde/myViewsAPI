import { infoRequestStatus } from '@prisma/client';

export class InforequestEntity {
  id: string;
  postId: string;
  userId: string;
  status: infoRequestStatus;
  createdAt: Date;
  updatedAt: Date;
}
