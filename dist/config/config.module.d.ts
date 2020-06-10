import { DynamicModule } from '@nestjs/common';
import { Options } from '../options.interface';
export declare class ConfigModule {
    static register(options: Options): DynamicModule;
}
