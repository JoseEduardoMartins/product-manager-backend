import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { ParamsProfileDto } from './dto/find-profile.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  find(paramsProfileDto?: ParamsProfileDto): Promise<Profile[]> {
    return this.profileRepository.find({
      ...paramsProfileDto,
      relations: {
        features: true,
      },
    });
  }

  findOne(id: number): Promise<Profile> {
    return this.profileRepository.findOne({
      where: { id },
      relations: {
        features: true,
      },
    });
  }

  async create(createProfileDto: CreateProfileDto) {
    const user = this.profileRepository.create(createProfileDto);
    const response = await this.profileRepository.save(user);
    return { id: response.id };
  }

  async update(id: number, updateProfileDto: UpdateProfileDto): Promise<void> {
    const response = await this.profileRepository.update(
      { id },
      updateProfileDto,
    );
    if (response?.affected === 0) return null;
  }

  async remove(id: number): Promise<void> {
    const response = await this.profileRepository.delete({ id });
    if (response?.affected === 0) return null;
  }
}
