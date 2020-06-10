import { BlueprintService } from './blueprint.service';
export declare class BlueprintResolver {
    private blueprintService;
    private logger;
    constructor(blueprintService: BlueprintService);
    blueprints(): Promise<import("./blueprint.interface").Blueprint[]>;
}
