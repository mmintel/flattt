import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from './config.service';
import { CONFIG_OPTIONS } from './constants';

const mockOptions = {
  blueprintsPath: '/blueprints',
  recordsPath: '/records',
}

describe('ConfigService', () => {
  let configService: ConfigService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        {
          provide: CONFIG_OPTIONS,
          useValue: mockOptions,
        },
      ],
    }).compile();

    configService = moduleRef.get<ConfigService>(ConfigService);
  });

  it('should return the blueprintsPath', () => {
    expect(configService.blueprintsPath).toEqual(mockOptions.blueprintsPath);
  });

  it('should return the recordsPath', () => {
    expect(configService.recordsPath).toEqual(mockOptions.recordsPath);
  });
});