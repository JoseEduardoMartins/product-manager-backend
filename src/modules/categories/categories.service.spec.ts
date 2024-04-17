import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  UpdateResponse,
  DeleteResponse,
} from '../../common/interfaces/repository-response';

const findResponse = [
  new Category({ id: 1, name: 'test-1' }),
  new Category({ id: 2, name: 'test-2' }),
  new Category({ id: 3, name: 'test-3' }),
];
const findOneResponse = new Category({ id: 1, name: 'test-1' });
const createResponse = new Category({ id: 1, name: 'test-1' });
const saveResponse = new Category({ id: 1, name: 'test-1' });
const updateResponse = new UpdateResponse({
  generatedMaps: [],
  raw: [],
  affected: 1,
});
const deleteResponse = new DeleteResponse({ raw: [], affected: 1 });

const createdResponse = { id: 1 };

describe('CategoriesService', () => {
  let sectorService: CategoriesService;
  let sectorRepository: Repository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
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

    sectorService = module.get<CategoriesService>(CategoriesService);
    sectorRepository = module.get<Repository<Category>>(
      getRepositoryToken(Category),
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
    it('should return a sector entity successfully', async () => {
      const id = 1;
      const result = await sectorService.findOne(id);

      expect(result).toEqual(findOneResponse);
      expect(typeof result).toEqual('object');
      expect(sectorRepository.findOne).toHaveBeenCalledTimes(1);
      expect(sectorRepository.findOne).toHaveBeenCalledWith({ where: { id } });
    });

    it('should throw an exception', () => {
      jest.spyOn(sectorService, 'findOne').mockRejectedValueOnce(new Error());
      expect(sectorService.findOne(1)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should create a new sector entity successfuly', async () => {
      const body: CreateCategoryDto = {
        name: 'teste-1',
      };

      const result = await sectorService.create(body);

      expect(result).toEqual(createdResponse);
      expect(sectorRepository.create).toHaveBeenCalledTimes(1);
      expect(sectorRepository.save).toHaveBeenCalledTimes(1);
      expect(sectorRepository.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      const body: CreateCategoryDto = {
        name: 'teste-1',
      };

      jest.spyOn(sectorRepository, 'save').mockRejectedValueOnce(new Error());
      expect(sectorService.create(body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a sector entity successfuly', async () => {
      const id = 1;

      const body: UpdateCategoryDto = {
        name: 'teste-1.1',
      };

      const result = await sectorService.update(id, body);

      expect(result).toBeUndefined();
      expect(sectorRepository.update).toHaveBeenCalledTimes(1);
      expect(sectorRepository.update).toHaveBeenCalledWith({ id }, body);
    });

    it('should throw an exception', () => {
      const id = 1;

      const body: UpdateCategoryDto = {
        name: 'teste-1.1',
      };

      jest.spyOn(sectorRepository, 'update').mockRejectedValueOnce(new Error());
      expect(sectorService.update(id, body)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove a sector entity successfuly', async () => {
      const id = 1;

      const result = await sectorService.remove(id);

      expect(result).toBeUndefined();
      expect(sectorRepository.delete).toHaveBeenCalledTimes(1);
      expect(sectorRepository.delete).toHaveBeenCalledWith({ id });
    });

    it('should throw an exception', () => {
      const id = 1;

      jest.spyOn(sectorRepository, 'delete').mockRejectedValueOnce(new Error());
      expect(sectorService.remove(id)).rejects.toThrowError();
    });
  });
});