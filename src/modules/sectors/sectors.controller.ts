import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SectorsService } from './sectors.service';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';

@ApiTags('Sector')
@ApiBearerAuth()
@Controller('sectors')
export class SectorsController {
  constructor(private readonly sectorsService: SectorsService) {}

  @ApiOperation({
    description: 'Listagem de setores utilizando filtros.',
    tags: ['Sector'],
  })
  @Get()
  find() {
    return this.sectorsService.find();
  }

  @ApiOperation({
    description: 'Listagem de setor utilizando id.',
    tags: ['Sector'],
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sectorsService.findOne(id);
  }

  @ApiOperation({
    description: 'Criação de setor.',
    tags: ['Sector'],
  })
  @Post()
  create(@Body() createSectorDto: CreateSectorDto) {
    return this.sectorsService.create(createSectorDto);
  }

  @ApiOperation({
    description: 'Atualização de setor.',
    tags: ['Sector'],
  })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSectorDto: UpdateSectorDto,
  ) {
    await this.sectorsService.update(id, updateSectorDto);
  }

  @ApiOperation({
    description: 'Deleção de setor.',
    tags: ['Sector'],
  })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.sectorsService.remove(id);
  }
}
