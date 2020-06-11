import { Module, DynamicModule } from '@nestjs/common';
import { ConfigService } from './config.service';
import { Options } from '..';

@Module({})
export class ConfigModule {
  public static register(options: Options): DynamicModule {
    return {
      module: ConfigModule,
      global: true,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        ConfigService,
      ],
      exports: [
        ConfigService
      ]
    }
  }
}