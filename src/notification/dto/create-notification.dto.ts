import { notificationType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  @Length(20)
  userId: string;

  @IsNotEmpty()
  @IsEnum(notificationType)
  type: notificationType;
}
