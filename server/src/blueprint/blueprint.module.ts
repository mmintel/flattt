import { JsonModule } from '../json';
import { ConfigModule } from '../config';
import { Module } from '@nestjs/common';
import { BlueprintRepository } from './blueprint.repository';
import { BlueprintResolver } from './blueprint.resolver';
import { BlueprintService } from './blueprint.service';

@Module({
  imports: [
    ConfigModule,
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