import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Options } from './options.interface';

export async function boot(options: Options) {
  return NestFactory.create(AppModule.register(options));
}
