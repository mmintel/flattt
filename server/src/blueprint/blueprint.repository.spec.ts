import { Test } from '@nestjs/testing';
import { ConfigService } from '../config';
import { JsonService } from '../json';
import { BlueprintRepository } from './blueprint.repository';

const mockJsonService = () => ({
  readDir: jest.fn(),
  readFile: jest.fn(),
});

const mockConfigService = () => ({
  blueprintsPath: '/blueprints'
})

describe('BlueprintRepository', () => {
  let blueprintRepository;
  let jsonService;
  let appConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BlueprintRepository,
        { provide: JsonService, useFactory: mockJsonService },
        { provide: ConfigService, useFactory: mockConfigService },
      ],
    }).compile();

    blueprintRepository = await module.get<BlueprintRepository>(BlueprintRepository);
    jsonService = await module.get<JsonService>(JsonService);
    appConfigService = await module.get<ConfigService>(ConfigService);
  });

  describe('find', () => {
    it('calls the jsonService and returns the blueprints', async () => {
      const mockFiles = [{ title: 'foo' }, { title: 'bar' }];
      jsonService.readDir.mockResolvedValue(mockFiles)
      const result = await blueprintRepository.find();
      expect(jsonService.readDir).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockFiles)
    });
  });


  describe('findOne', () => {
    it('calls the jsonService and returns the blueprint', async () => {
      const mockFile = { title: 'foo' };
      const path = '/foo';
      jsonService.readFile.mockResolvedValue(mockFile)
      const result = await blueprintRepository.findOne(path);
      expect(jsonService.readFile).toHaveBeenCalledTimes(1);
      expect(jsonService.readFile).toHaveBeenCalledWith(appConfigService.blueprintsPath + path);
      expect(result).toEqual(mockFile)
    });
  });
});