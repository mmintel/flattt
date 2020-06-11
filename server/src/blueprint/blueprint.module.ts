import { JsonModule } from '../json';
import { AppConfigModule } from '../app-config';
import { Module } from '@nestjs/common';
import { BlueprintRepository } from './blueprint.repository';
import { BlueprintResolver } from './blueprint.resolver';
import { BlueprintService } from './blueprint.service';

@Module({
  imports: [
    AppConfigModule,
    JsonModule,
  ],
  providers: [
    BlueprintResolver,
    BlueprintService,
    BlueprintRepository
  ],
  exports: [
    BlueprintService
  ]
})

export class BlueprintModule {}