import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('app', () => {
    it('should return "Here will be my amazing react frontend"', () => {
      expect(appController.app()).toBe(
        'Here will be my amazing react frontend',
      );
    });
  });
});
