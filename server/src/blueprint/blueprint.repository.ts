import { join } from 'path';
import { ConfigService } from '../config';
import { JsonService } from '../json/json.service';
import { Injectable, Logger } from '@nestjs/common';
import { Blueprint } from './blueprint.interface';

@Injectable()
export class BlueprintRepository {
  private logger = new Logger('BlueprintRepository');
  private blueprintsPath: string;

  constructor (
    private jsonService: JsonService,
    private appConfigService: ConfigService,
  ) {
    this.blueprintsPath = `${this.appConfigService.blueprintsPath}`
  }

  async find(): Promise<Array<Blueprint>> {
    this.logger.verbose(`Called find with ${this.blueprintsPath}`);
    return this.jsonService.readDir(this.blueprintsPath);
  }

  async findOne(path: string): Promise<Blueprint> {
    const filePath = join(this.blueprintsPath, path);
    this.logger.verbose('Called findOne with %s', filePath);
    return this.jsonService.readFile<Blueprint>(filePath);
  }
}