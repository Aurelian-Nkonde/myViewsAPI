import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { InforequestModule } from './inforequest/inforequest.module';
import { ReactionModule } from './reaction/reaction.module';
import { NotificationModule } from './notification/notification.module';
import { PostModule } from './post/post.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    AccountModule,
    PostModule,
    NotificationModule,
    ReactionModule,
    InforequestModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
