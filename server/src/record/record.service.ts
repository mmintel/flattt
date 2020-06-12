import { RecordRepository } from './record.repository';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class RecordService {
  private logger = new Logger('RecordService');

  constructor(private recordRepository: RecordRepository) {}

  async getRecords() {
    this.logger.verbose('Called getRecords');

    return this.recordRepository.find();
  }
}
