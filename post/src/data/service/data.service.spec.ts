import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Row } from '../schemas/data.schema';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken('row'),
          useValue: Row,
        },
        DataService
      ],
      
    }).compile();

    service = module.get<DataService>(DataService);
  });

  it('should be defined', () => {
    const mockRow = {
      country: 'testCountry',
      sector: 'testSector',
      parentSector: 'testParentSector',
      series: {
        year: 1
      }
    }
    expect(service.saveRow(mockRow)).toBeCalled();
  });
});
