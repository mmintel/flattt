import { Test } from '@nestjs/testing';
import { BlueprintService } from './blueprint.service';
import { BlueprintResolver } from './blueprint.resolver';

const mockBlueprintService = () => ({
  getBlueprints: jest.fn(),
});

describe('BlueprintService', () => {
  let blueprintResolver;
  let blueprintService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BlueprintResolver,
        { provide: BlueprintService, useFactory: mockBlueprintService },
      ],
    }).compile();

    blueprintResolver = await module.get<BlueprintResolver>(BlueprintResolver);
    blueprintService = await module.get<BlueprintService>(BlueprintService);
  });

  describe('getBlueprints', () => {
    it('calls the blueprintService and returns the blueprints', async () => {
      const mockBlueprints = [1, 2];
      blueprintService.getBlueprints.mockResolvedValue(mockBlueprints)
      const result = await blueprintResolver.blueprints();
      expect(blueprintService.getBlueprints).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockBlueprints)
    })
  })
});