import { Test } from '@nestjs/testing';
import { AppConfigService } from '../app-config/app-config.service';
import { JsonService } from '../json/json.service';
import { BlueprintRepository } from './blueprint.repository';

const mockJsonService = () => ({
  readDir: jest.fn(),
  readFile: jest.fn(),
});

const mockAppConfigService = () => ({
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
        { provide: AppConfigService, useFactory: mockAppConfigService },
      ],
    }).compile();

    blueprintRepository = await module.get<BlueprintRepository>(BlueprintRepository);
    jsonService = await module.get<JsonService>(JsonService);
    appConfigService = await module.get<AppConfigService>(AppConfigService);
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