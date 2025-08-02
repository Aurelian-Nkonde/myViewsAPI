import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { PrismaService } from 'src/prisma.service';
import { NotificationEntity } from './entities/notification.entity';
import GenerateUniqueId, { IdType } from 'src/utils/generateUniqueId';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async createNotification(
    createNotificationDto: CreateNotificationDto,
  ): Promise<NotificationEntity> {
    const notification = await this.prisma.notification.create({
      data: {
        id: GenerateUniqueId(IdType.NOTIFICATION_ID),
        read: false,
        message: 'A notification has been created, check out whats happening',
        ...createNotificationDto,
      },
    });
    if (!notification) {
      throw new InternalServerErrorException();
    }
    return notification;
  }

  async readNotification(id: string): Promise<NotificationEntity> {
    const notification = await this.prisma.notification.findFirst({
      where: { id: id },
    });
    if (!notification) {
      throw new NotFoundException();
    }
    const updated = await this.prisma.notification.update({
      where: {
        id: id,
      },
      data: {
        read: true,
      },
    });
    if (!updated) {
      throw new InternalServerErrorException();
    }
    return updated;
  }

  async getAllUserUnReadNotifications(
    id: string,
  ): Promise<NotificationEntity[]> {
    return await this.prisma.notification.findMany({
      where: {
        userId: id,
        read: !true,
      },
    });
  }

  async getAllUserUnReadNotificationsCount(id: string): Promise<number> {
    return await this.prisma.notification.count({
      where: {
        userId: id,
        read: !true,
      },
    });
  }
}
