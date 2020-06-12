import path from 'path';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { GraphQLModule } from '@nestjs/graphql';
import { BlueprintModule } from '../src/blueprint';
import { ConfigModule, ConfigService } from '../src/config';

const mockOptions = {
  blueprintsPath: path.resolve('../example/data/blueprints'),
  recordsPath: path.resolve('../example/data/content')
}

const mockConfigService = () => ({
  blueprintsPath: path.resolve('../example/data/blueprints'),
  recordsPath: path.resolve('../example/data/content')
})

describe('BlueprintModule (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.register(mockOptions),
        GraphQLModule.forRoot({
          autoSchemaFile: true,
        }),
        BlueprintModule,
      ],
      providers: [
        // { provide: 'CONFIG_OPTIONS', useValue: mockOptions },
        // { provide: ConfigService, useFactory: mockConfigService },
      ],
      // exports: [
      //   'OPTIONS'
      // ]
    })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('blueprints (Query)', () => {
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
        expect(blueprints).toContainEqual({ title: 'Document' });
        expect(blueprints).toContainEqual({ title: 'Collections' });
      })
  });
});
