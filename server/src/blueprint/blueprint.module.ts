import { JsonModule } from '../json';
import { Module } from '@nestjs/common';
import { BlueprintRepository } from './blueprint.repository';
import { BlueprintResolver } from './blueprint.resolver';
import { BlueprintService } from './blueprint.service';

@Module({
  imports: [
    JsonModule,
  ],
  providers: [
    BlueprintResolver,
    BlueprintService,
    BlueprintRepository
  ]
})

export class BlueprintModule {}