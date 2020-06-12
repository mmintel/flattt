import { join } from 'path';
import { ConfigService } from '../config';
import { JsonService } from '../json/json.service';
import { Injectable, Logger } from '@nestjs/common';
import { Record } from './record.interface';

@Injectable()
export class RecordRepository {
  private logger = new Logger('RecordRepository');
  private recordsPath: string;

  constructor(
    private jsonService: JsonService,
    private configService: ConfigService,
  ) {
    this.recordsPath = `${this.configService.recordsPath}`;
  }

  async find(): Promise<Array<Record>> {
    this.logger.verbose(`Called find with ${this.recordsPath}`);
    return this.jsonService.readDir(this.recordsPath);
  }

  async findOne(path: string): Promise<Record> {
    const filePath = join(this.recordsPath, path);
    this.logger.verbose('Called findOne with %s', filePath);
    return this.jsonService.readFile<Record>(filePath);
  }
}
