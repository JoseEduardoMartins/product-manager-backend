import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  findAll(): Promise<Address[]> {
    return this.addressRepository.find();
  }

  findOne(id: number): Promise<Address> {
    return this.addressRepository.findOne({ where: { id } });
  }

  async create(createAddressDto: CreateAddressDto) {
    const address = this.addressRepository.create(createAddressDto);
    const response = await this.addressRepository.save(address);
    return { id: response.id };
  }

  async update(id: number, updateAddressDto: UpdateAddressDto): Promise<void> {
    await this.addressRepository.update({ id }, updateAddressDto);
  }

  async remove(id: number): Promise<void> {
    await this.addressRepository.delete({ id });
  }
}
