import { Test, TestingModule } from '@nestjs/testing';
import { Company } from './entities/company.entity';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { CreateCompanyDto } from './dto/create-category.dto';
import { UpdateCompanyDto } from './dto/update-category.dto';

const companyEtityList: Company[] = [
  new Company({ id: 1, name: 'test-1' }),
  new Company({ id: 2, name: 'test-2' }),
  new Company({ id: 3, name: 'test-3' }),
];

const createResponse = { id: 1 };

describe('CompaniesController', () => {
  let companyController: CompaniesController;
  let companyService: CompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CompaniesService,
          useValue: {
            find: jest.fn().mockResolvedValue(companyEtityList),
            findOne: jest.fn().mockResolvedValue(companyEtityList[0]),
            create: jest.fn().mockResolvedValue(createResponse),
            update: jest.fn().mockResolvedValue(undefined),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
      controllers: [CompaniesController],
    }).compile();

    companyController = module.get<CompaniesController>(CompaniesController);
    companyService = module.get<CompaniesService>(CompaniesService);
  });

  it('should be defined', () => {
    expect(companyController).toBeDefined();
    expect(companyService).toBeDefined();
  });

  describe('find', () => {
    it('should return a company list entity successfully', async () => {
      const result = await companyController.find();

      expect(result).toEqual(companyEtityList);
      expect(typeof result).toEqual('object');
      expect(companyService.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(companyService, 'find').mockRejectedValueOnce(new Error());
      expect(companyController.find()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a company entity successfully', async () => {
      const id = 1;
      const result = await companyController.findOne(id);

      expect(result).toEqual(companyEtityList[0]);
      expect(typeof result).toEqual('object');
      expect(companyService.findOne).toHaveBeenCalledTimes(1);
      expect(companyService.findOne).toHaveBeenCalledWith(id);
    });

    it('should throw an exception', () => {
      jest.spyOn(companyService, 'findOne').mockRejectedValueOnce(new Error());
      expect(companyController.findOne(1)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    const body: CreateCompanyDto = {
      name: 'test-1',
      sector_id: 1,
      address_id: 1,
    };

    it('should create a new company entity successfuly', async () => {
      const result = await companyController.create(body);

      expect(result).toEqual(createResponse);
      expect(companyService.create).toHaveBeenCalledTimes(1);
      expect(companyService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      jest.spyOn(companyService, 'create').mockRejectedValueOnce(new Error());
      expect(companyController.create(body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    const id = 1;

    const body: UpdateCompanyDto = {
      name: 'test-1',
    };

    it('should update a company entity successfuly', async () => {
      const result = await companyController.update(id, body);

      expect(result).toBeUndefined();
      expect(companyService.update).toHaveBeenCalledTimes(1);
      expect(companyService.update).toHaveBeenCalledWith(id, body);
    });

    it('should throw an exception', () => {
      jest.spyOn(companyService, 'update').mockRejectedValueOnce(new Error());
      expect(companyController.update(id, body)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    const id = 1;

    it('should remove a company entity successfuly', async () => {
      const result = await companyController.remove(id);

      expect(result).toBeUndefined();
      expect(companyService.remove).toHaveBeenCalledTimes(1);
      expect(companyService.remove).toHaveBeenCalledWith(id);
    });

    it('should throw an exception', () => {
      jest.spyOn(companyService, 'remove').mockRejectedValueOnce(new Error());
      expect(companyController.remove(id)).rejects.toThrowError();
    });
  });
});
