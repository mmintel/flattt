import { Options } from '../options.interface';
export declare class ConfigService {
    private options;
    constructor(options: Options);
    get(path: any): any;
}
