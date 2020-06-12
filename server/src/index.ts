import { NestFactory, NestApplication } from '@nestjs/core';
import { AppModule } from './app/app.module';

export interface Options {
  blueprintsPath: string;
  recordsPath: string;
}

export default class Flattt {
  private app: NestApplication;

  constructor(private options: Options) {}

  async init() {
    this.app = await NestFactory.create(AppModule.register(this.options));
  }

  async start(port: number) {
    return this.app.listen(port);
  }

  mount(app, mountPath) {
    this.app.init();
    app.use(mountPath, this.app.getHttpAdapter().getInstance());
    return app;
  }
}
