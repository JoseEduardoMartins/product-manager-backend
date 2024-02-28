import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './user.service';
import { FindUserDto } from './dto/find-user-dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    description: 'Listagem de usuarios utilizando filtros.',
    tags: ['User'],
  })
  @Get()
  findAll(@Query() query: FindUserDto) {
    const { select, ...filters } = query;
    return this.usersService.find({ select, filters });
  }

  @ApiOperation({
    description: 'Listagem de usuario utilizando id.',
    tags: ['User'],
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({
    description: 'Criação de usuario.',
    tags: ['User'],
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({
    description: 'Atualização de usuario',
    tags: ['User'],
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({
    description: 'Deleção de usuario',
    tags: ['User'],
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
