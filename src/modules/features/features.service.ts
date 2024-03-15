import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericCreateResponse } from 'src/common/interfaces/generic-response';
import { Feature } from './entities/feature.entity';
import { ParamsFeatureDto } from './dto/find-feature.dto';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';

@Injectable()
export class FeaturesService {
  constructor(
    @InjectRepository(Feature)
    private featureRepository: Repository<Feature>,
  ) {}

  find(paramsFeatureDto?: ParamsFeatureDto): Promise<Feature[]> {
    return this.featureRepository.find(paramsFeatureDto);
  }

  findOne(id: number): Promise<Feature> {
    return this.featureRepository.findOne({ where: { id } });
  }

  async create(
    createFeatureDto: CreateFeatureDto,
  ): Promise<GenericCreateResponse> {
    const data = {
      ...createFeatureDto,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const feature = this.featureRepository.create(data);
    const response = await this.featureRepository.save(feature);
    return { id: response.id };
  }

  async update(id: number, updateFeatureDto: UpdateFeatureDto): Promise<void> {
    const data = {
      ...updateFeatureDto,
      updated_at: new Date(),
    };

    const response = await this.featureRepository.update({ id }, data);
    if (response?.affected === 0) return null;
  }

  async remove(id: number): Promise<void> {
    const response = await this.featureRepository.delete({ id });
    if (response?.affected === 0) return null;
  }
}
