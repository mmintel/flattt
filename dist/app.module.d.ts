import { DynamicModule } from '@nestjs/common';
import { Options } from './options.interface';
export declare class AppModule {
    static register(options: Options): DynamicModule;
}
