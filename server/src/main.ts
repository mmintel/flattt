import Flattt from '.';
import * as path from 'path';

export async function bootstrap() {
  const flattt = new Flattt({
    blueprintsPath: path.resolve('../example/data/blueprints')
  })
  await flattt.init();
  await flattt.start(3000);
}

bootstrap()