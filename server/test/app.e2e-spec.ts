import path from 'path';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app';

const options = {
  blueprintsPath: path.resolve('../example/data/blueprints'),
  recordsPath: path.resolve('../example/data/content')
}

describe('AppModule (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule.register(options)],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Here will be my amazing react frontend');
  });

  test('/graphql (GET)', () => {
    return request(app.getHttpServer())
      .get('/graphql')
      .set('Accept', 'text/html')
      .expect(200)
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
