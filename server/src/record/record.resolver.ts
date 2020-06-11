import { Logger } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { RecordType } from './types/record.type';
import { RecordService } from './record.service';

@Resolver(() => RecordType)
export class RecordResolver {
  private logger = new Logger('RecordResolver');

  constructor(
    private recordService: RecordService,
  ) {}

  @Query(() => [RecordType])
  async records() {
    const records = await this.recordService.getRecords();
    this.logger.verbose(`Received records from service: ${JSON.stringify(records)}`)
    return records;
  }
}