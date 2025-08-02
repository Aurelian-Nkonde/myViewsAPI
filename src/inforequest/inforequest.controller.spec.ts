import { Test, TestingModule } from '@nestjs/testing';
import { InforequestController } from './inforequest.controller';
import { InforequestService } from './inforequest.service';

describe('InforequestController', () => {
  let controller: InforequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InforequestController],
      providers: [InforequestService],
    }).compile();

    controller = module.get<InforequestController>(InforequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
