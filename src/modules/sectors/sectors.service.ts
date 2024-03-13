import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericCreateResponse } from 'src/common/interfaces/generic-response';
import { Sector } from './entities/sector.entity';
import { ParamsSectorDto } from './dto/find-sector.dto';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';

@Injectable()
export class SectorsService {
  constructor(
    @InjectRepository(Sector)
    private sectorRepository: Repository<Sector>,
  ) {}

  find(paramsSectorDto?: ParamsSectorDto): Promise<Sector[]> {
    return this.sectorRepository.find(paramsSectorDto);
  }

  findOne(id: number): Promise<Sector> {
    return this.sectorRepository.findOne({ where: { id } });
  }

  async create(
    createSectorDto: CreateSectorDto,
  ): Promise<GenericCreateResponse> {
    const sector = this.sectorRepository.create(createSectorDto);
    const response = await this.sectorRepository.save(sector);
    return { id: response.id };
  }

  async update(id: number, updateSectorDto: UpdateSectorDto): Promise<void> {
    const response = await this.sectorRepository.update(
      { id },
      updateSectorDto,
    );
    if (response?.affected === 0) return null;
  }

  async remove(id: number): Promise<void> {
    const response = await this.sectorRepository.delete({ id });
    if (response?.affected === 0) return null;
  }
}
