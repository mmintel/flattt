import { Options } from './options.interface';
import { boot } from './boot';

export async function mount(app, mountPath: string, options: Options) {
  const subApp = await boot(options)
  await subApp.init()

  app.use(mountPath, subApp.getHttpAdapter().getInstance());

  return app
}