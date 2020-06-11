import { Module, DynamicModule } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { Options } from '..';

@Module({})
export class AppConfigModule {
  public static register(options: Options): DynamicModule {
    return {
      module: AppConfigModule,
      global: true,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        AppConfigService,
      ],
      exports: [
        AppConfigService
      ]
    }
  }
}