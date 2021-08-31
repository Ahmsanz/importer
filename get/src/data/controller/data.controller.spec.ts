import { Test, TestingModule } from '@nestjs/testing';
import { response } from 'express';
import * as request from 'supertest';
import { DataService } from '../service/data.service';
import { DataController } from './data.controller';

describe('Data Controller', () => {
  let controller: DataController;
  let spyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataController],
      providers: [
        {
          provide: DataService,
          useFactory: () => ({
            getUsersWithoutKey: jest.fn(() => true),
            addUser: jest.fn(() => true),
          }),
        },
      ],
    }).compile();
    controller = module.get(DataController);
    spyService = module.get(DataService);
  });

  describe('data', () => {
    it('/data GET', () => {      
      const req = request(controller.getData())
        .get('/')
        .expect(200)
        // .expect(spyService.getData()).
      
      return req;      
    });
  });  
});
