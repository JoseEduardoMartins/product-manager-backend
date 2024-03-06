import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CitiesService } from './cities.service';
import { FindCityDto } from './dto/find-city.dto';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@ApiTags('City')
@ApiBearerAuth()
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @ApiOperation({
    description: 'Listagem de cidades utilizando filtros.',
    tags: ['City'],
  })
  @Get()
  findAll(@Query() query: FindCityDto) {
    const { select, ...where } = query;
    return this.citiesService.find({ select, where });
  }

  @ApiOperation({
    description: 'Listagem de cidade utilizando id.',
    tags: ['City'],
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.citiesService.findOne(id);
  }

  @ApiOperation({
    description: 'Criação de cidade.',
    tags: ['City'],
  })
  @Post()
  create(@Body() createCityDto: CreateCityDto) {
    return this.citiesService.create(createCityDto);
  }

  @ApiOperation({
    description: 'Atualização de cidade.',
    tags: ['City'],
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCityDto: UpdateCityDto,
  ) {
    return this.citiesService.update(id, updateCityDto);
  }

  @ApiOperation({
    description: 'Deleção de cidade.',
    tags: ['City'],
  })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.citiesService.remove(id);
  }
}
