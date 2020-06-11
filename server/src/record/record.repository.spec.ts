import { Test } from '@nestjs/testing';
import { ConfigService } from '../config';
import { JsonService } from '../json/json.service';
import { RecordRepository } from './record.repository';

const mockJsonService = () => ({
  readDir: jest.fn(),
  readFile: jest.fn(),
});

const mockConfigService = () => ({
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
        { provide: ConfigService, useFactory: mockConfigService },
      ],
    }).compile();

    recordRepository = await module.get<RecordRepository>(RecordRepository);
    jsonService = await module.get<JsonService>(JsonService);
    appConfigService = await module.get<ConfigService>(ConfigService);
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