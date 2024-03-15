import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeaturesService } from './features.service';
import { Feature } from './entities/feature.entity';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import {
  UpdateResponse,
  DeleteResponse,
} from '../../common/interfaces/repository-response';

const findResponse = [
  new Feature({
    id: 1,
    name: 'lista de feature',
    baseurl: '',
    route: '/feature',
    method: 'GET',
  }),
  new Feature({
    id: 2,
    name: 'cadastro de feature',
    baseurl: '',
    route: '/feature',
    method: 'POST',
  }),
];
const findOneResponse = new Feature({
  id: 1,
  name: 'lista de feature',
  baseurl: '',
  route: '/feature',
  method: 'GET',
});
const createResponse = new Feature({
  id: 1,
  name: 'lista de feature',
  baseurl: '',
  route: '/feature',
  method: 'GET',
});
const createdResponse = { id: 1 };
const saveResponse = new Feature({
  id: 1,
  name: 'lista de feature',
  baseurl: '',
  route: '/feature',
  method: 'GET',
});
const updateResponse = new UpdateResponse({
  generatedMaps: [],
  raw: [],
  affected: 1,
});
const deleteResponse = new DeleteResponse({ raw: [], affected: 1 });

describe('FeaturesService', () => {
  let featureService: FeaturesService;
  let featureRepository: Repository<Feature>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeaturesService,
        {
          provide: getRepositoryToken(Feature),
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

    featureService = module.get<FeaturesService>(FeaturesService);
    featureRepository = module.get<Repository<Feature>>(
      getRepositoryToken(Feature),
    );
  });

  it('should be defined', () => {
    expect(featureService).toBeDefined();
    expect(featureRepository).toBeDefined();
  });

  describe('find', () => {
    it('should return a list of sector entities successfully', async () => {
      const result = await featureService.find();

      expect(result).toEqual(findResponse);
      expect(typeof result).toEqual('object');
      expect(featureRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(featureRepository, 'find').mockRejectedValueOnce(new Error());
      expect(featureService.find()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a sector entity successfully', async () => {
      const id = 1;
      const result = await featureService.findOne(id);

      expect(result).toEqual(findOneResponse);
      expect(typeof result).toEqual('object');
      expect(featureRepository.findOne).toHaveBeenCalledTimes(1);
      expect(featureRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
    });

    it('should throw an exception', () => {
      jest.spyOn(featureService, 'findOne').mockRejectedValueOnce(new Error());
      expect(featureService.findOne(1)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    const body: CreateFeatureDto = {
      name: 'lista de feature',
      baseurl: '',
      route: '/feature',
      method: 'GET',
    };

    it('should create a new sector entity successfuly', async () => {
      const result = await featureService.create(body);

      expect(result).toEqual(createdResponse);
      expect(featureRepository.create).toHaveBeenCalledTimes(1);
      expect(featureRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(featureRepository, 'save').mockRejectedValueOnce(new Error());
      expect(featureService.create(body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    const id = 1;

    const body: UpdateFeatureDto = {
      name: 'lista de feature',
      baseurl: '',
      route: '/feature',
      method: 'GET',
    };

    it('should update a sector entity successfuly', async () => {
      const result = await featureService.update(id, body);

      expect(result).toBeUndefined();
      expect(featureRepository.update).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(featureRepository, 'update')
        .mockRejectedValueOnce(new Error());
      expect(featureService.update(id, body)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    const id = 1;

    it('should remove a sector entity successfuly', async () => {
      const result = await featureService.remove(id);

      expect(result).toBeUndefined();
      expect(featureRepository.delete).toHaveBeenCalledTimes(1);
      expect(featureRepository.delete).toHaveBeenCalledWith({ id });
    });

    it('should throw an exception', () => {
      jest
        .spyOn(featureRepository, 'delete')
        .mockRejectedValueOnce(new Error());
      expect(featureService.remove(id)).rejects.toThrowError();
    });
  });
});
