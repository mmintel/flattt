import path from 'path';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { GraphQLModule } from '@nestjs/graphql';
import { BlueprintModule } from '../src/blueprint';
import { ConfigModule } from '../src/config';
import { JsonService } from '../src/json';

const mockOptions = {
  blueprintsPath: path.resolve('../example/data/blueprints'),
  recordsPath: path.resolve('../example/data/content')
}

const mockJsonService = () => ({
  readFile: jest.fn(),
  readDir: jest.fn(),
})

describe('BlueprintModule (e2e)', () => {
  let app: INestApplication;
  let jsonService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.register(mockOptions),
        GraphQLModule.forRoot({
          autoSchemaFile: true,
        }),
        BlueprintModule,
      ],
    })
      .overrideProvider(JsonService)
      .useFactory({ factory: mockJsonService })
      .compile();

    app = moduleFixture.createNestApplication();
    jsonService = await app.get<JsonService>(JsonService);
    await app.init();
  });

  test('blueprints (Query)', () => {
    const mockFiles = [ { title: 'foo' }, { title: 'bar' }];
    jsonService.readDir.mockResolvedValue(mockFiles);
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: `
          query {
            blueprints {
              title
            }
          }
        `,
      })
      .expect(200)
      .expect(({ body }) => {
        const blueprints = body.data.blueprints;
        expect(blueprints.length).toBeGreaterThan(0);
        expect(blueprints).toContainEqual(mockFiles[0]);
        expect(blueprints).toContainEqual(mockFiles[1]);
      })
  });
});
