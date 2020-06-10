import { BlueprintRepository } from './blueprint.repository';
export declare class BlueprintService {
    private blueprintRepository;
    private logger;
    constructor(blueprintRepository: BlueprintRepository);
    getBlueprints(): Promise<import("./blueprint.interface").Blueprint[]>;
}
