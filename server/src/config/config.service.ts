import { Options } from '../options.interface';
import { Inject, Injectable } from '@nestjs/common';
import { get } from 'lodash';

@Injectable()
export class ConfigService {
  constructor(@Inject('CONFIG_OPTIONS') private options: Options) {}

  get(path) {
    return get(this.options, path);
  }
}