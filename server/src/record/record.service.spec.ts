import { Test } from '@nestjs/testing';
import { RecordService } from './record.service';
import { RecordRepository } from './record.repository';
// import { NotFoundException } from '@nestjs/common';

const mockRecordRepository = () => ({
  find: jest.fn(),
});

describe('RecordService', () => {
  let recordService;
  let recordRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RecordService,
        { provide: RecordRepository, useFactory: mockRecordRepository },
      ],
    }).compile();

    recordService = await module.get<RecordService>(RecordService);
    recordRepository = await module.get<RecordRepository>(RecordRepository);
  });

  describe('getRecords', () => {
    it('calls the recordRepository and returns the records', async () => {
      const mockRecords = [1, 2];
      recordRepository.find.mockResolvedValue(mockRecords);
      const result = await recordService.getRecords();
      expect(recordRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockRecords);
    });
  });
});
