import { Module, DynamicModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BlueprintModule } from '../blueprint';
import { RecordModule } from '../record';
import { ConfigModule } from '../config'
import { AppController } from './app.controller';
import { Options } from '..';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true
    }),
    BlueprintModule,
    RecordModule
  ],
  controllers: [
    AppController
  ]
})
export class AppModule {
  public static register(options: Options): DynamicModule {
    if (!options) throw new Error('Please provide options.');

    return {
      module: AppModule,
      global: true,
      imports: [
        ConfigModule.register(options),
      ]
    }
  }
}
