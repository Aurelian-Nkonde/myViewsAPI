import { Module } from '@nestjs/common';
import { InforequestService } from './inforequest.service';
import { InforequestController } from './inforequest.controller';
import { PrismaService } from 'src/prisma.service';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  controllers: [InforequestController],
  providers: [InforequestService, PrismaService, NotificationService],
})
export class InforequestModule {}
