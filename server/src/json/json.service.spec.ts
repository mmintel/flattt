import { Test } from '@nestjs/testing';
import { JsonService } from './json.service';
import { vol } from 'memfs';

// eslint-disable-next-line global-require
jest.mock('fs', () => require('memfs'));

describe('JsonService', () => {
  let jsonService;

  beforeEach(async () => {
    vol.reset();

    const moduleRef = await Test.createTestingModule({
      providers: [JsonService],
    }).compile();

    jsonService = await moduleRef.get<JsonService>(JsonService);
  });

  describe('readFile', () => {
    describe('reads a single json file from storage', () => {
      test('reads the file with extension', async () => {
        const mockFile = { title: 'Document' };
        vol.fromJSON(
          {
            './documents.json': JSON.stringify(mockFile),
          },
          '/content',
        );
        const file = await jsonService.readFile('/content/documents.json');
        expect(file).toEqual(mockFile);
      });

      test('reads the file without extension', async () => {
        const mockFile = { title: 'Document' };
        vol.fromJSON(
          {
            './documents.json': JSON.stringify(mockFile),
          },
          '/content',
        );
        const file = await jsonService.readFile('/content/documents');
        expect(file).toEqual(mockFile);
      });

      test('returns null for non-existent files', async () => {
        vol.fromJSON({}, '/content');
        const file = await jsonService.readFile('/content/documents');
        expect(file).toEqual(null);
      });
    });
  });

  describe('readDir', () => {
    describe('reads all json files from storage', () => {
      test('all jsons', async () => {
        const mockFile1 = { id: 1 };
        const mockFile2 = { id: 2 };
        const mockFile3 = { id: 3 };

        vol.fromJSON(
          {
            './foo.json': JSON.stringify(mockFile1),
            './bar.json': JSON.stringify(mockFile2),
            './baz.json': JSON.stringify(mockFile3),
          },
          '/content',
        );

        const files = await jsonService.readDir('/content');
        expect(files).toContainEqual(mockFile1);
        expect(files).toContainEqual(mockFile2);
        expect(files).toContainEqual(mockFile3);
      });

      test('only jsons', async () => {
        const mockFile1 = { id: 1 };
        const mockFile2 = { id: 2 };
        const mockFile3 = { id: 3 };

        vol.fromJSON(
          {
            './foo.json': JSON.stringify(mockFile1),
            './bar.txt': JSON.stringify(mockFile2),
            './baz.json': JSON.stringify(mockFile3),
          },
          '/content',
        );

        const files = await jsonService.readDir('/content');
        expect(files).toContainEqual(mockFile1);
        expect(files).toContainEqual(mockFile3);
        expect(files).not.toContainEqual(mockFile2);
      });
    });
  });
});
