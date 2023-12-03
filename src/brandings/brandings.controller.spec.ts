import { Test, TestingModule } from '@nestjs/testing';
import { BrandingsController } from './brandings.controller';
import { BrandingsService } from './brandings.service';

describe('BrandingsController', () => {
  let controller: BrandingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandingsController],
      providers: [BrandingsService],
    }).compile();

    controller = module.get<BrandingsController>(BrandingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
