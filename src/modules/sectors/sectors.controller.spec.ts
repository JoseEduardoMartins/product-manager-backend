import { Test, TestingModule } from '@nestjs/testing';
import { Sector } from './entities/sector.entity';
import { SectorsService } from './sectors.service';
import { SectorsController } from './sectors.controller';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';

const sectorEtityList: Sector[] = [
  new Sector({ id: 1, name: 'test-1' }),
  new Sector({ id: 2, name: 'test-2' }),
  new Sector({ id: 3, name: 'test-3' }),
];

const createResponse = { id: 1 };

describe('SectorsController', () => {
  let sectorController: SectorsController;
  let sectorService: SectorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SectorsService,
          useValue: {
            find: jest.fn().mockResolvedValue(sectorEtityList),
            findOne: jest.fn().mockResolvedValue(sectorEtityList[0]),
            create: jest.fn().mockResolvedValue(createResponse),
            update: jest.fn().mockResolvedValue(undefined),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
      controllers: [SectorsController],
    }).compile();

    sectorController = module.get<SectorsController>(SectorsController);
    sectorService = module.get<SectorsService>(SectorsService);
  });

  it('should be defined', () => {
    expect(sectorController).toBeDefined();
    expect(sectorService).toBeDefined();
  });

  describe('find', () => {
    it('should return a sector list entity successfully', async () => {
      const result = await sectorController.find();

      expect(result).toEqual(sectorEtityList);
      expect(typeof result).toEqual('object');
      expect(sectorService.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(sectorService, 'find').mockRejectedValueOnce(new Error());
      expect(sectorController.find()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a sector entity successfully', async () => {
      const id = 1;
      const result = await sectorController.findOne(id);

      expect(result).toEqual(sectorEtityList[0]);
      expect(typeof result).toEqual('object');
      expect(sectorService.findOne).toHaveBeenCalledTimes(1);
      expect(sectorService.findOne).toHaveBeenCalledWith(id);
    });

    it('should throw an exception', () => {
      jest.spyOn(sectorService, 'findOne').mockRejectedValueOnce(new Error());
      expect(sectorController.findOne(1)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should create a new sector entity successfuly', async () => {
      const body: CreateSectorDto = {
        name: 'test-1',
      };

      const result = await sectorController.create(body);

      expect(result).toEqual(createResponse);
      expect(sectorService.create).toHaveBeenCalledTimes(1);
      expect(sectorService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      const body: CreateSectorDto = {
        name: 'test-1',
      };

      jest.spyOn(sectorService, 'create').mockRejectedValueOnce(new Error());
      expect(sectorController.create(body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a sector entity successfuly', async () => {
      const id = 1;

      const body: UpdateSectorDto = {
        name: 'test-1',
      };

      const result = await sectorController.update(id, body);

      expect(result).toBeUndefined();
      expect(sectorService.update).toHaveBeenCalledTimes(1);
      expect(sectorService.update).toHaveBeenCalledWith(id, body);
    });

    it('should throw an exception', () => {
      const id = 1;

      const body: UpdateSectorDto = {
        name: 'test-1',
      };

      jest.spyOn(sectorService, 'update').mockRejectedValueOnce(new Error());
      expect(sectorController.update(id, body)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove a sector entity successfuly', async () => {
      const id = 1;

      const result = await sectorController.remove(id);

      expect(result).toBeUndefined();
      expect(sectorService.remove).toHaveBeenCalledTimes(1);
      expect(sectorService.remove).toHaveBeenCalledWith(id);
    });

    it('should throw an exception', () => {
      const id = 1;

      jest.spyOn(sectorService, 'remove').mockRejectedValueOnce(new Error());
      expect(sectorController.remove(id)).rejects.toThrowError();
    });
  });
});
