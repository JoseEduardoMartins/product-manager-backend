import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { Profile } from './entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

const findResponse = [
  new Profile({
    id: 1,
    name: 'teste-1',
    is_active: true,
  }),
  new Profile({
    id: 2,
    name: 'teste-2',
    is_active: true,
  }),
  new Profile({
    id: 3,
    name: 'teste-3',
    is_active: true,
  }),
];
const findOneResponse = new Profile({
  id: 1,
  name: 'teste-1',
  is_active: true,
});
const createdResponse = { id: 1 };
const updateResponse = undefined;
const deleteResponse = undefined;

describe('ProfilesController', () => {
  let profileController: ProfilesController;
  let profileService: ProfilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilesController],
      providers: [
        {
          provide: ProfilesService,
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

    profileController = module.get<ProfilesController>(ProfilesController);
    profileService = module.get<ProfilesService>(ProfilesService);
  });

  it('should be defined', () => {
    expect(profileController).toBeDefined();
    expect(profileService).toBeDefined();
  });

  describe('find', () => {
    it('should return a city list entity successfully', async () => {
      const result = await profileController.find();

      expect(result).toEqual(findResponse);
      expect(typeof result).toEqual('object');
      expect(profileService.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(profileService, 'find').mockRejectedValueOnce(new Error());
      expect(profileController.find()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a city entity successfully', async () => {
      const id = 1;
      const result = await profileController.findOne(id);

      expect(result).toEqual(findOneResponse);
      expect(typeof result).toEqual('object');
      expect(profileService.findOne).toHaveBeenCalledTimes(1);
      expect(profileService.findOne).toHaveBeenCalledWith(id);
    });

    it('should throw an exception', () => {
      jest.spyOn(profileService, 'findOne').mockRejectedValueOnce(new Error());
      expect(profileController.findOne(1)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    const body: CreateProfileDto = {
      name: 'test-1',
    };

    it('should create a new address entity successfuly', async () => {
      const result = await profileController.create(body);

      expect(result).toEqual(createdResponse);
      expect(profileService.create).toHaveBeenCalledTimes(1);
      expect(profileService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      jest.spyOn(profileService, 'create').mockRejectedValueOnce(new Error());
      expect(profileController.create(body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    const id = 1;

    const body: UpdateProfileDto = {
      name: 'test-1',
    };

    it('should update a address entity successfuly', async () => {
      const result = await profileController.update(id, body);

      expect(result).toBeUndefined();
      expect(profileService.update).toHaveBeenCalledTimes(1);
      expect(profileService.update).toHaveBeenCalledWith(id, body);
    });

    it('should throw an exception', () => {
      jest.spyOn(profileService, 'update').mockRejectedValueOnce(new Error());
      expect(profileController.update(id, body)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    const id = 1;

    it('should remove a address entity successfuly', async () => {
      const result = await profileController.remove(id);

      expect(result).toBeUndefined();
      expect(profileService.remove).toHaveBeenCalledTimes(1);
      expect(profileService.remove).toHaveBeenCalledWith(id);
    });

    it('should throw an exception', () => {
      jest.spyOn(profileService, 'remove').mockRejectedValueOnce(new Error());
      expect(profileController.remove(id)).rejects.toThrowError();
    });
  });
});
