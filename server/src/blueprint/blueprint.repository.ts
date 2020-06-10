import { ConfigService } from '../config/config.service';
import { JsonService } from '../json/json.service';
import { Injectable, Logger } from '@nestjs/common';
import { Blueprint } from './blueprint.interface';

@Injectable()
export class BlueprintRepository {
  private logger = new Logger('BlueprintRepository');
  private blueprintsPath: string;

  constructor (
    private jsonService: JsonService,
    private configService: ConfigService
  ) {
    this.blueprintsPath = `${this.configService.get('flattt.blueprintsPath')}`
  }

  async find(): Promise<Array<Blueprint>> {
    this.logger.verbose(`Called find with ${this.blueprintsPath}`);
    return this.jsonService.readDir(this.blueprintsPath);
  }

  async findOne(path: string): Promise<Blueprint> {
    const filePath = `${this.blueprintsPath}/${path}`;
    this.logger.verbose('Called findOne with %s', filePath);
    return this.jsonService.readFile<Blueprint>(filePath);
  }
}