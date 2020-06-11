import { Module, DynamicModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BlueprintModule } from './blueprint';
import { AppConfigModule } from './app-config';

export interface Options {
  blueprintsPath: string,
}

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
    console.log('App received options', options);
    return {
      module: AppModule,
      global: true,
      imports: [
        AppConfigModule.register(options),
      ]
    }
  }
}
