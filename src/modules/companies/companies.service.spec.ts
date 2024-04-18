import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompaniesService } from './companies.service';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-category.dto';
import { UpdateCompanyDto } from './dto/update-category.dto';
import {
  UpdateResponse,
  DeleteResponse,
} from '../../common/interfaces/repository-response';

const findResponse = [
  new Company({ id: 1, name: 'test-1' }),
  new Company({ id: 2, name: 'test-2' }),
  new Company({ id: 3, name: 'test-3' }),
];
const findOneResponse = new Company({ id: 1, name: 'test-1' });
const createResponse = new Company({ id: 1, name: 'test-1' });
const saveResponse = new Company({ id: 1, name: 'test-1' });
const updateResponse = new UpdateResponse({
  generatedMaps: [],
  raw: [],
  affected: 1,
});
const deleteResponse = new DeleteResponse({ raw: [], affected: 1 });

const createdResponse = { id: 1 };

describe('CompaniesService', () => {
  let sectorService: CompaniesService;
  let sectorRepository: Repository<Company>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompaniesService,
        {
          provide: getRepositoryToken(Company),
          useValue: {
            find: jest.fn().mockResolvedValue(findResponse),
            findOne: jest.fn().mockResolvedValue(findOneResponse),
            create: jest.fn().mockResolvedValue(createResponse),
            save: jest.fn().mockResolvedValue(saveResponse),
            update: jest.fn().mockResolvedValue(updateResponse),
            delete: jest.fn().mockResolvedValue(deleteResponse),
          },
        },
      ],
    }).compile();

    sectorService = module.get<CompaniesService>(CompaniesService);
    sectorRepository = module.get<Repository<Company>>(
      getRepositoryToken(Company),
    );
  });

  it('should be defined', () => {
    expect(sectorService).toBeDefined();
    expect(sectorRepository).toBeDefined();
  });

  describe('find', () => {
    it('should return a sector entity list successfully', async () => {
      const result = await sectorService.find();

      expect(result).toEqual(findResponse);
      expect(typeof result).toEqual('object');
      expect(sectorRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(sectorRepository, 'find').mockRejectedValueOnce(new Error());
      expect(sectorService.find()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    const id = 1;

    it('should return a sector entity successfully', async () => {
      const result = await sectorService.findOne(id);

      expect(result).toEqual(findOneResponse);
      expect(typeof result).toEqual('object');
      expect(sectorRepository.findOne).toHaveBeenCalledTimes(1);
      expect(sectorRepository.findOne).toHaveBeenCalledWith({ where: { id } });
    });

    it('should throw an exception', () => {
      jest.spyOn(sectorService, 'findOne').mockRejectedValueOnce(new Error());
      expect(sectorService.findOne(id)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    const body: CreateCompanyDto = {
      name: 'teste-1',
      sector_id: 1,
      address_id: 1,
    };

    it('should create a new sector entity successfuly', async () => {
      const result = await sectorService.create(body);

      expect(result).toEqual(createdResponse);
      expect(sectorRepository.create).toHaveBeenCalledTimes(1);
      expect(sectorRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(sectorRepository, 'save').mockRejectedValueOnce(new Error());
      expect(sectorService.create(body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    const id = 1;

    const body: UpdateCompanyDto = {
      name: 'teste-1.1',
    };

    it('should update a sector entity successfuly', async () => {
      const result = await sectorService.update(id, body);

      expect(result).toBeUndefined();
      expect(sectorRepository.update).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(sectorRepository, 'update').mockRejectedValueOnce(new Error());
      expect(sectorService.update(id, body)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    const id = 1;

    it('should remove a sector entity successfuly', async () => {
      const result = await sectorService.remove(id);

      expect(result).toBeUndefined();
      expect(sectorRepository.delete).toHaveBeenCalledTimes(1);
      expect(sectorRepository.delete).toHaveBeenCalledWith({ id });
    });

    it('should throw an exception', () => {
      jest.spyOn(sectorRepository, 'delete').mockRejectedValueOnce(new Error());
      expect(sectorService.remove(id)).rejects.toThrowError();
    });
  });
});
