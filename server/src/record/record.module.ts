import { JsonModule } from '../json';
import { AppConfigModule } from '../app-config';
import { Module } from '@nestjs/common';
import { RecordRepository } from './record.repository';
import { RecordResolver } from './record.resolver';
import { RecordService } from './record.service';

@Module({
  imports: [
    AppConfigModule,
    JsonModule,
  ],
  providers: [
    RecordResolver,
    RecordService,
    RecordRepository
  ],
  exports: [
    RecordService
  ]
})

export class RecordModule {}