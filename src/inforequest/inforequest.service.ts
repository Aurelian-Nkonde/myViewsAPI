import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateInforequestDto } from './dto/create-inforequest.dto';
import { PrismaService } from 'src/prisma.service';
import { InforequestEntity } from './entities/inforequest.entity';
import GenerateUniqueId, { IdType } from 'src/utils/generateUniqueId';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class InforequestService {
  constructor(
    private prisma: PrismaService,
    private notificationService: NotificationService,
  ) {}

  async createInfoRequest(
    createInfoRequestDto: CreateInforequestDto,
  ): Promise<InforequestEntity> {
    const data = await this.prisma.infoRequest.create({
      data: {
        id: GenerateUniqueId(IdType.INFO_REQUEST),
        status: 'PENDING',
        ...createInfoRequestDto,
      },
    });
    if (!data) {
      throw new InternalServerErrorException();
    }
    const userId = (
      await this.prisma.post.findFirst({ where: { id: data.postId } })
    )?.userId;
    if (!userId) {
      throw new BadRequestException();
    }
    //notification send here
    await this.notificationService.createNotification({
      userId: userId,
      type: 'INFO_REQUEST_NOTIFICATION',
    });
    return data;
  }

  async settleInfoRequest(id: string): Promise<InforequestEntity> {
    const infoRequest = await this.prisma.infoRequest.findFirst({
      where: { id: id },
    });
    if (!infoRequest) {
      throw new NotFoundException();
    }
    const updated = await this.prisma.infoRequest.update({
      where: {
        id: id,
      },
      data: {
        status: 'CLOSED',
      },
    });
    if (!updated) {
      throw new InternalServerErrorException();
    }
    const userId = (
      await this.prisma.post.findFirst({ where: { id: infoRequest.postId } })
    )?.userId;
    if (!userId) {
      throw new BadRequestException();
    }
    //notification send here
    await this.notificationService.createNotification({
      userId: userId,
      type: 'INFO_REQUEST_NOTIFICATION',
    });
    //notification send
    //email sent here
    return updated;
  }

  async getUserInfoRequests(id: string): Promise<InforequestEntity[]> {
    return await this.prisma.infoRequest.findMany({ where: { userId: id } });
  }
}
