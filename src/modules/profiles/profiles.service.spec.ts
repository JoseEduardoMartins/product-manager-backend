import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfilesService } from './profiles.service';
import { Profile } from './entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import {
  UpdateResponse,
  DeleteResponse,
} from '../../common/interfaces/repository-response';

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
const createResponse = new Profile({
  id: 1,
  name: 'teste-1',
  is_active: true,
});
const createdResponse = { id: 1 };
const saveResponse = new Profile({
  id: 1,
  name: 'teste-1',
  is_active: true,
});
const updateResponse = new UpdateResponse({
  generatedMaps: [],
  raw: [],
  affected: 1,
});
const deleteResponse = new DeleteResponse({ raw: [], affected: 1 });

describe('ProfilesService', () => {
  let profileService: ProfilesService;
  let profileRepository: Repository<Profile>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfilesService,
        {
          provide: getRepositoryToken(Profile),
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

    profileService = module.get<ProfilesService>(ProfilesService);
    profileRepository = module.get<Repository<Profile>>(
      getRepositoryToken(Profile),
    );
  });

  it('should be defined', () => {
    expect(profileService).toBeDefined();
    expect(profileRepository).toBeDefined();
  });

  describe('find', () => {
    it('should return a list of sector entities successfully', async () => {
      const result = await profileService.find();

      expect(result).toEqual(findResponse);
      expect(typeof result).toEqual('object');
      expect(profileRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(profileRepository, 'find').mockRejectedValueOnce(new Error());
      expect(profileService.find()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a sector entity successfully', async () => {
      const id = 1;
      const result = await profileService.findOne(id);

      expect(result).toEqual(findOneResponse);
      expect(typeof result).toEqual('object');
      expect(profileRepository.findOne).toHaveBeenCalledTimes(1);
      expect(profileRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
    });

    it('should throw an exception', () => {
      jest.spyOn(profileService, 'findOne').mockRejectedValueOnce(new Error());
      expect(profileService.findOne(1)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    const body: CreateProfileDto = {
      name: 'teste-1',
    };

    it('should create a new sector entity successfuly', async () => {
      const result = await profileService.create(body);

      expect(result).toEqual(createdResponse);
      expect(profileRepository.create).toHaveBeenCalledTimes(1);
      expect(profileRepository.save).toHaveBeenCalledTimes(1);
      expect(profileRepository.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      jest.spyOn(profileRepository, 'save').mockRejectedValueOnce(new Error());
      expect(profileService.create(body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    const id = 1;

    const body: UpdateProfileDto = {
      name: 'teste-1.1',
    };
    it('should update a sector entity successfuly', async () => {
      const result = await profileService.update(id, body);

      expect(result).toBeUndefined();
      expect(profileRepository.update).toHaveBeenCalledTimes(1);
      expect(profileRepository.update).toHaveBeenCalledWith({ id }, body);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(profileRepository, 'update')
        .mockRejectedValueOnce(new Error());
      expect(profileService.update(id, body)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove a sector entity successfuly', async () => {
      const id = 1;

      const result = await profileService.remove(id);

      expect(result).toBeUndefined();
      expect(profileRepository.delete).toHaveBeenCalledTimes(1);
      expect(profileRepository.delete).toHaveBeenCalledWith({ id });
    });

    it('should throw an exception', () => {
      const id = 1;

      jest
        .spyOn(profileRepository, 'delete')
        .mockRejectedValueOnce(new Error());
      expect(profileService.remove(id)).rejects.toThrowError();
    });
  });
});
