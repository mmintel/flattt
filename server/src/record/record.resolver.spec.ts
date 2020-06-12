import { Test } from '@nestjs/testing';
import { RecordService } from './record.service';
import { RecordResolver } from './record.resolver';

const mockRecordService = () => ({
  getRecords: jest.fn(),
});

describe('RecordService', () => {
  let recordResolver;
  let recordService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RecordResolver,
        { provide: RecordService, useFactory: mockRecordService },
      ],
    }).compile();

    recordResolver = await module.get<RecordResolver>(RecordResolver);
    recordService = await module.get<RecordService>(RecordService);
  });

  describe('getRecords', () => {
    it('calls the recordService and returns the records', async () => {
      const mockRecords = [1, 2];
      recordService.getRecords.mockResolvedValue(mockRecords);
      const result = await recordResolver.records();
      expect(recordService.getRecords).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockRecords);
    });
  });
});
