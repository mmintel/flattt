import { BlueprintRepository } from './blueprint.repository';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BlueprintService {
  private logger = new Logger('BlueprintService');

  constructor(private blueprintRepository: BlueprintRepository) {}

  async getBlueprints() {
    this.logger.verbose('Called getBlueprints');

    return this.blueprintRepository.find();
  }
}
