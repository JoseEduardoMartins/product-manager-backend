import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';
import { ParamsCountryDto } from './dto/find-country.dto';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
  ) {}

  find(paramsCountryDto: ParamsCountryDto): Promise<Country[]> {
    return this.countryRepository.find(paramsCountryDto);
  }

  findOne(id: number): Promise<Country> {
    return this.countryRepository.findOne({ where: { id } });
  }

  async create(createCountryDto: CreateCountryDto) {
    const user = this.countryRepository.create(createCountryDto);
    const response = await this.countryRepository.save(user);
    return { id: response.id };
  }

  async update(id: number, updateCountryDto: UpdateCountryDto): Promise<void> {
    await this.countryRepository.update({ id }, updateCountryDto);
  }

  async remove(id: number): Promise<void> {
    await this.countryRepository.delete({ id });
  }
}
