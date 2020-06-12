import { Logger } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { BlueprintType } from './types/blueprint.type';
import { BlueprintService } from './blueprint.service';

@Resolver(() => BlueprintType)
export class BlueprintResolver {
  private logger = new Logger('BlueprintResolver');

  constructor(private blueprintService: BlueprintService) {}

  @Query(() => [BlueprintType])
  async blueprints() {
    const blueprints = await this.blueprintService.getBlueprints();
    this.logger.verbose(
      `Received blueprints from service: ${JSON.stringify(blueprints)}`,
    );
    return blueprints;
  }
}
