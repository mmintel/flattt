import { Inject, Injectable } from '@nestjs/common';
import { Options } from '..';

@Injectable()
export class AppConfigService {
  constructor(@Inject('CONFIG_OPTIONS') private options: Options) {}

  get blueprintsPath() {
    return this.options.blueprintsPath;
  }

  get recordsPath() {
    return this.options.recordsPath;
  }
}