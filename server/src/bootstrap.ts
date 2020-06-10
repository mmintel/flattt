import { boot } from './boot';
import * as path from 'path';

export async function bootstrap() {
  const app = await boot({
    flattt: {
      blueprintsPath: path.resolve('../example/blueprints')
    }
  })
  await app.listen(3000);
}
