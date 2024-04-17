import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericCreateResponse } from 'src/common/interfaces/generic-response';
import { Category } from './entities/category.entity';
import { ParamsCategoryDto } from './dto/find-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private sectorRepository: Repository<Category>,
  ) {}

  find(paramsCategoryDto?: ParamsCategoryDto): Promise<Category[]> {
    return this.sectorRepository.find(paramsCategoryDto);
  }

  findOne(id: number): Promise<Category> {
    return this.sectorRepository.findOne({ where: { id } });
  }

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<GenericCreateResponse> {
    const sector = this.sectorRepository.create(createCategoryDto);
    const response = await this.sectorRepository.save(sector);
    return { id: response.id };
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    const response = await this.sectorRepository.update(
      { id },
      updateCategoryDto,
    );
    if (response?.affected === 0) return null;
  }

  async remove(id: number): Promise<void> {
    const response = await this.sectorRepository.delete({ id });
    if (response?.affected === 0) return null;
  }
}
