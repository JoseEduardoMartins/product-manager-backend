import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { ParamsUserDto } from './dto/find-user-dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  find(paramsUserDto: ParamsUserDto): Promise<User[]> {
    return this.userRepository.find(paramsUserDto);
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(createUserDto: CreateUserDto) {
    const data = {
      ...createUserDto,
      is_active: true,
      is_verified: false,
      is_deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const user = this.userRepository.create(data);
    const response = await this.userRepository.save(user);
    return { id: response.id };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const data = {
      ...updateUserDto,
      updated_at: new Date(),
    };

    await this.userRepository.update({ id }, data);
    return {};
  }

  async remove(id: number) {
    const data = {
      is_deleted: true,
      deleted_at: new Date(),
    };

    await this.userRepository.update({ id }, data);
    return {};
  }
}
