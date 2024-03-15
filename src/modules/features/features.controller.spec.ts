import { Test, TestingModule } from '@nestjs/testing';
import { FeaturesController } from './features.controller';
import { FeaturesService } from './features.service';
import { Feature } from './entities/feature.entity';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';

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
const createdResponse = { id: 1 };
const updateResponse = undefined;
const deleteResponse = undefined;

describe('FeaturesController', () => {
  let featureController: FeaturesController;
  let featureService: FeaturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeaturesController],
      providers: [
        {
          provide: FeaturesService,
          useValue: {
            find: jest.fn().mockResolvedValue(findResponse),
            findOne: jest.fn().mockResolvedValue(findOneResponse),
            create: jest.fn().mockResolvedValue(createdResponse),
            update: jest.fn().mockResolvedValue(updateResponse),
            remove: jest.fn().mockResolvedValue(deleteResponse),
          },
        },
      ],
    }).compile();

    featureController = module.get<FeaturesController>(FeaturesController);
    featureService = module.get<FeaturesService>(FeaturesService);
  });

  it('should be defined', () => {
    expect(featureController).toBeDefined();
    expect(featureService).toBeDefined();
  });

  describe('find', () => {
    it('should return a city list entity successfully', async () => {
      const result = await featureController.find();

      expect(result).toEqual(findResponse);
      expect(typeof result).toEqual('object');
      expect(featureService.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(featureService, 'find').mockRejectedValueOnce(new Error());
      expect(featureController.find()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a city entity successfully', async () => {
      const id = 1;
      const result = await featureController.findOne(id);

      expect(result).toEqual(findOneResponse);
      expect(typeof result).toEqual('object');
      expect(featureService.findOne).toHaveBeenCalledTimes(1);
      expect(featureService.findOne).toHaveBeenCalledWith(id);
    });

    it('should throw an exception', () => {
      jest.spyOn(featureService, 'findOne').mockRejectedValueOnce(new Error());
      expect(featureController.findOne(1)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    const body: CreateFeatureDto = {
      name: 'lista de feature',
      baseurl: '',
      route: '/feature',
      method: 'GET',
    };

    it('should create a new address entity successfuly', async () => {
      const result = await featureController.create(body);

      expect(result).toEqual(createdResponse);
      expect(featureService.create).toHaveBeenCalledTimes(1);
      expect(featureService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      jest.spyOn(featureService, 'create').mockRejectedValueOnce(new Error());
      expect(featureController.create(body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    const id = 1;

    const body: UpdateFeatureDto = {
      name: 'lista de feature',
    };

    it('should update a address entity successfuly', async () => {
      const result = await featureController.update(id, body);

      expect(result).toBeUndefined();
      expect(featureService.update).toHaveBeenCalledTimes(1);
      expect(featureService.update).toHaveBeenCalledWith(id, body);
    });

    it('should throw an exception', () => {
      jest.spyOn(featureService, 'update').mockRejectedValueOnce(new Error());
      expect(featureController.update(id, body)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    const id = 1;

    it('should remove a address entity successfuly', async () => {
      const result = await featureController.remove(id);

      expect(result).toBeUndefined();
      expect(featureService.remove).toHaveBeenCalledTimes(1);
      expect(featureService.remove).toHaveBeenCalledWith(id);
    });

    it('should throw an exception', () => {
      jest.spyOn(featureService, 'remove').mockRejectedValueOnce(new Error());
      expect(featureController.remove(id)).rejects.toThrowError();
    });
  });
});
