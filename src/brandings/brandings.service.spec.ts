import { Test, TestingModule } from '@nestjs/testing';
import { BrandingsService } from './brandings.service';

describe('BrandingsService', () => {
  let service: BrandingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrandingsService],
    }).compile();

    service = module.get<BrandingsService>(BrandingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
