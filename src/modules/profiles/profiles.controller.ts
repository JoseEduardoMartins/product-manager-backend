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
import { ProfilesService } from './profiles.service';
import { FindProfileDto } from './dto/find-profile.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@ApiTags('Profile')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @ApiOperation({
    description: 'Listagem dos perfis utilizando filtros.',
    tags: ['Profile'],
  })
  @Get()
  find(@Query() query?: FindProfileDto) {
    const params = getParams(query);
    return this.profilesService.find(params);
  }

  @ApiOperation({
    description: 'Listagem de perfil utilizando id.',
    tags: ['Profile'],
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.profilesService.findOne(+id);
  }

  @ApiOperation({
    description: 'Criação de perfil.',
    tags: ['Profile'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const response = await this.profilesService.update(id, updateProfileDto);

    if (response === null)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const response = await this.profilesService.remove(id);

    if (response === null)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
