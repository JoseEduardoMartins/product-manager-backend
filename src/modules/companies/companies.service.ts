import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericCreateResponse } from 'src/common/interfaces/generic-response';
import { Company } from './entities/company.entity';
import { ParamsCompanyDto } from './dto/find-category.dto';
import { CreateCompanyDto } from './dto/create-category.dto';
import { UpdateCompanyDto } from './dto/update-category.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  find(paramsCompanyDto?: ParamsCompanyDto): Promise<Company[]> {
    return this.companyRepository.find(paramsCompanyDto);
  }

  findOne(id: number): Promise<Company> {
    return this.companyRepository.findOne({ where: { id } });
  }

  async create(
    createCompanyDto: CreateCompanyDto,
  ): Promise<GenericCreateResponse> {
    const data = {
      ...createCompanyDto,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const company = this.companyRepository.create(data);
    const response = await this.companyRepository.save(company);
    return { id: response.id };
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto): Promise<void> {
    const data = {
      ...updateCompanyDto,
      updated_at: new Date(),
    };

    const response = await this.companyRepository.update({ id }, data);
    if (response?.affected === 0) return null;
  }

  async remove(id: number): Promise<void> {
    const data = {
      is_active: false,
      is_deleted: true,
      deleted_at: new Date(),
    };

    const response = await this.companyRepository.update({ id }, data);
    if (response?.affected === 0) return null;
  }
}
