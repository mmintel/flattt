import { Module, DynamicModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BlueprintModule } from './blueprint';
import { RecordModule } from './record';
import { AppConfigModule } from './app-config';
import { Options } from '.';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true
    }),
    BlueprintModule,
    RecordModule
  ],
})
export class AppModule {
  public static register(options: Options): DynamicModule {
    return {
      module: AppModule,
      global: true,
      imports: [
        AppConfigModule.register(options),
      ]
    }
  }
}
