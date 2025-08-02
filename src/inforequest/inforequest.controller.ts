import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { InforequestService } from './inforequest.service';
import { CreateInforequestDto } from './dto/create-inforequest.dto';
import { InforequestEntity } from './entities/inforequest.entity';

@Controller('inforequest')
export class InforequestController {
  constructor(private readonly inforequestService: InforequestService) {}

  @Post()
  async createInfoRequest(
    @Body() createInfoRequestDto: CreateInforequestDto,
  ): Promise<InforequestEntity> {
    return await this.inforequestService.createInfoRequest(
      createInfoRequestDto,
    );
  }

  @Put('settle/:id')
  async settleInfoRequest(@Param('id') id: string): Promise<InforequestEntity> {
    return await this.inforequestService.settleInfoRequest(id);
  }

  @Get('all/:id')
  async getUserInfoRequests(
    @Param('id') id: string,
  ): Promise<InforequestEntity[]> {
    return await this.inforequestService.getUserInfoRequests(id);
  }
}
