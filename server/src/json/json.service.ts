import * as fs from 'fs-extra';
import fg from 'fast-glob'
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class JsonService {
  private logger = new Logger('JsonService');

  async readFile<T>(path: string): Promise<T> {
    this.logger.verbose(`read file: ${path}`);
    return fs.readJson(path);
  }

  async readDir<T>(path: string): Promise<Array<T>> {
    this.logger.verbose(`read dir: ${path}`);
    const dir = await fg(`${path}/*.json`)
    return Promise.all(dir.map(async (fileName: string) => {
      return this.readFile<any>(fileName)
    }))
  }
}