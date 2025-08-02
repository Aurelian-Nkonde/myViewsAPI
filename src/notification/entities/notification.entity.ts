import { notificationType } from '@prisma/client';

export class NotificationEntity {
  id: string;
  userId: string;
  read: boolean;
  type: notificationType;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}
