import { Test, TestingModule } from '@nestjs/testing';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { Country } from './entities/country.entity';

const countryEtityList: Country[] = [
  new Country({ id: 1, name: 'test-1', isocode: 'BR', phonecode: '+55' }),
  new Country({ id: 2, name: 'test-2', isocode: 'BR', phonecode: '+55' }),
  new Country({ id: 3, name: 'test-3', isocode: 'BR', phonecode: '+55' }),
];

const createResponse = { id: 1 };

describe('CountriesController', () => {
  let controller: CountriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountriesController],
      providers: [
        {
          provide: CountriesService,
          useValue: {
            find: jest.fn().mockResolvedValue(countryEtityList),
            findOne: jest.fn().mockResolvedValue(countryEtityList[0]),
            create: jest.fn().mockResolvedValue(createResponse),
            update: jest.fn().mockResolvedValue(undefined),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<CountriesController>(CountriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
