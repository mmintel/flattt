import { Inject, Injectable } from '@nestjs/common';
import { Options } from '..';

@Injectable()
export class ConfigService {
  constructor(@Inject('CONFIG_OPTIONS') private options: Options) {}

  get blueprintsPath(): string {
    return this.options.blueprintsPath;
  }

  get recordsPath(): string {
    return this.options.recordsPath;
  }
}
