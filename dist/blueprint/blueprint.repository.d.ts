import { ConfigService } from '../config/config.service';
import { JsonService } from '../json/json.service';
import { Blueprint } from './blueprint.interface';
export declare class BlueprintRepository {
    private jsonService;
    private configService;
    private logger;
    private blueprintsPath;
    constructor(jsonService: JsonService, configService: ConfigService);
    find(): Promise<Array<Blueprint>>;
    findOne(path: string): Promise<Blueprint>;
}
