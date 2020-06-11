import { Test } from '@nestjs/testing';
import { AppConfigService } from '../app-config/app-config.service';
import { JsonService } from '../json/json.service';
import { RecordRepository } from './record.repository';

const mockJsonService = () => ({
  readDir: jest.fn(),
  readFile: jest.fn(),
});

const mockAppConfigService = () => ({
  recordsPath: '/records'
})

describe('RecordRepository', () => {
  let recordRepository;
  let jsonService;
  let appConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RecordRepository,
        { provide: JsonService, useFactory: mockJsonService },
        { provide: AppConfigService, useFactory: mockAppConfigService },
      ],
    }).compile();

    recordRepository = await module.get<RecordRepository>(RecordRepository);
    jsonService = await module.get<JsonService>(JsonService);
    appConfigService = await module.get<AppConfigService>(AppConfigService);
  });

  describe('find', () => {
    it('calls the jsonService and returns the records', async () => {
      const mockFiles = [{ title: 'foo' }, { title: 'bar' }];
      jsonService.readDir.mockResolvedValue(mockFiles)
      const result = await recordRepository.find();
      expect(jsonService.readDir).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockFiles)
    });
  });


  describe('findOne', () => {
    it('calls the jsonService and returns the record', async () => {
      const mockFile = { title: 'foo' };
      const path = '/foo';
      jsonService.readFile.mockResolvedValue(mockFile)
      const result = await recordRepository.findOne(path);
      expect(jsonService.readFile).toHaveBeenCalledTimes(1);
      expect(jsonService.readFile).toHaveBeenCalledWith(appConfigService.recordsPath + path);
      expect(result).toEqual(mockFile)
    });
  });
});