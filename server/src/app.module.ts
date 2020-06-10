import { Module, DynamicModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BlueprintModule } from './blueprint';
import { Options } from './options.interface';
import { ConfigModule } from './config';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true
    }),
    BlueprintModule
  ],
})
export class AppModule {
  public static register(options: Options): DynamicModule {
    return {
      module: AppModule,
      global: true,
      imports: [
        ConfigModule.register(options),
      ]
    }
  }
}
