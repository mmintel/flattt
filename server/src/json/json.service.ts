import * as fs from 'fs-extra';
import fg from 'fast-glob';
import { extname } from 'path';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class JsonService {
  private logger = new Logger('JsonService');

  async readFile<T>(path: string): Promise<T> {
    this.logger.verbose(`read file: ${path}`);
    const json = this.ensureJson(path);
    try {
      return await fs.readJson(json);
    } catch {
      this.logger.warn(`could not read file: ${path}`);
      return null;
    }
  }

  async readDir<T>(path: string): Promise<Array<T>> {
    this.logger.verbose(`read dir: ${path}`);
    const dir = await fg(`${path}/*.json`);
    return Promise.all(
      dir.map(async (fileName: string) => {
        return this.readFile<any>(fileName);
      }),
    );
  }

  private ensureJson(path: string) {
    let jsonPath = path;
    const json = '.json';
    const ext = extname(path);

    if (ext === '') {
      jsonPath = `${path}${json}`;
    } else if (ext !== json) {
      jsonPath = jsonPath.replace(ext, json);
    }

    return jsonPath;
  }
}
