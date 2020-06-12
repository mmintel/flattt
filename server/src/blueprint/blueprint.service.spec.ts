import { Test } from '@nestjs/testing';
import { BlueprintService } from './blueprint.service';
import { BlueprintRepository } from './blueprint.repository';
// import { NotFoundException } from '@nestjs/common';

const mockBlueprintRepository = () => ({
  find: jest.fn(),
});

describe('BlueprintService', () => {
  let blueprintService;
  let blueprintRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BlueprintService,
        { provide: BlueprintRepository, useFactory: mockBlueprintRepository },
      ],
    }).compile();

    blueprintService = await module.get<BlueprintService>(BlueprintService);
    blueprintRepository = await module.get<BlueprintRepository>(
      BlueprintRepository,
    );
  });

  describe('getBlueprints', () => {
    it('calls the blueprintRepository and returns the blueprints', async () => {
      const mockBlueprints = [1, 2];
      blueprintRepository.find.mockResolvedValue(mockBlueprints);
      const result = await blueprintService.getBlueprints();
      expect(blueprintRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockBlueprints);
    });
  });
});
