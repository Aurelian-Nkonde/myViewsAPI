import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationEntity } from './entities/notification.entity';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ): Promise<NotificationEntity> {
    return await this.notificationService.createNotification(
      createNotificationDto,
    );
  }

  @Put('read/:id')
  async readNotification(@Param('id') id: string): Promise<NotificationEntity> {
    return await this.notificationService.readNotification(id);
  }

  @Get('all/unread/:id')
  async readAllUserUnreadNotifications(
    @Param('id') id: string,
  ): Promise<NotificationEntity[]> {
    return await this.notificationService.getAllUserUnReadNotifications(id);
  }

  @Get('all/unread/count/:id')
  async readAllUserUnreadNotificationsCount(
    @Param('id') id: string,
  ): Promise<number> {
    return await this.notificationService.getAllUserUnReadNotificationsCount(
      id,
    );
  }
}
