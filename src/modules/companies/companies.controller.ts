import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { getParams } from '../../common/helpers/params';
import { CompaniesService } from './companies.service';
import { FindCompanyDto } from './dto/find-category.dto';
import { CreateCompanyDto } from './dto/create-category.dto';
import { UpdateCompanyDto } from './dto/update-category.dto';

@ApiTags('Company')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @ApiOperation({
    description: 'Listagem de companhias utilizando filtros.',
    tags: ['Company'],
  })
  @Get()
  find(@Query() query?: FindCompanyDto) {
    const params = getParams(query);
    return this.companiesService.find(params);
  }

  @ApiOperation({
    description: 'Listagem de companhia utilizando id.',
    tags: ['Company'],
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.companiesService.findOne(id);
  }

  @ApiOperation({
    description: 'Criação de companhia.',
    tags: ['Company'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @ApiOperation({
    description: 'Atualização de companhia.',
    tags: ['Company'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    const response = await this.companiesService.update(id, updateCompanyDto);

    if (response === null)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  @ApiOperation({
    description: 'Deleção de companhia.',
    tags: ['Company'],
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const response = await this.companiesService.remove(id);

    if (response === null)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
