import { Test, TestingModule } from '@nestjs/testing';
import { InforequestService } from './inforequest.service';

describe('InforequestService', () => {
  let service: InforequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InforequestService],
    }).compile();

    service = module.get<InforequestService>(InforequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
