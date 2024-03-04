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
import { CountriesService } from './countries.service';
import { FindCountryDto } from './dto/find-country.dto';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@ApiTags('Country')
@ApiBearerAuth()
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @ApiOperation({
    description: 'Listagem de paises utilizando filtros.',
    tags: ['Country'],
  })
  @Get()
  find(@Query() query: FindCountryDto) {
    const { select, ...where } = query;
    return this.countriesService.find({ select, where });
  }

  @ApiOperation({
    description: 'Listagem de pais utilizando id.',
    tags: ['Country'],
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.countriesService.findOne(id);
  }

  @ApiOperation({
    description: 'Criação de pais.',
    tags: ['Country'],
  })
  @Post()
  create(@Body() createCountryDto: CreateCountryDto) {
    return this.countriesService.create(createCountryDto);
  }

  @ApiOperation({
    description: 'Atualização de pais',
    tags: ['Country'],
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCountryDto: UpdateCountryDto,
  ) {
    return this.countriesService.update(id, updateCountryDto);
  }

  @ApiOperation({
    description: 'Deleção de pais',
    tags: ['Country'],
  })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.countriesService.remove(id);
  }
}
