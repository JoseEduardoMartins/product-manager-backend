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
import { FeaturesService } from './features.service';
import { FindFeatureDto } from './dto/find-feature.dto';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';

@ApiTags('Feature')
@Controller('features')
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @ApiOperation({
    description: 'Listagem de funcionalidades utilizando filtros.',
    tags: ['Feature'],
  })
  @Get()
  find(@Query() query?: FindFeatureDto) {
    const params = getParams(query);
    return this.featuresService.find(params);
  }

  @ApiOperation({
    description: 'Listagem de funcionalidade utilizando id.',
    tags: ['Feature'],
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.featuresService.findOne(+id);
  }

  @ApiOperation({
    description: 'Criação de funcionalidade.',
    tags: ['Feature'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createFeatureDto: CreateFeatureDto) {
    return this.featuresService.create(createFeatureDto);
  }

  @ApiOperation({
    description: 'Atualização de funcionalidade',
    tags: ['Feature'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFeatureDto: UpdateFeatureDto,
  ) {
    const response = await this.featuresService.update(id, updateFeatureDto);

    if (response === null)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  @ApiOperation({
    description: 'Deleção de funcionalidade',
    tags: ['Feature'],
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const response = await this.featuresService.remove(id);

    if (response === null)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
