export declare class JsonService {
    private logger;
    readFile<T>(path: string): Promise<T>;
    readDir<T>(path: string): Promise<Array<T>>;
}
