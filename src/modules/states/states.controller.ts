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
import { StateService } from './states.service';
import { FindStateDto } from './dto/find-states.dto';
import { CreateStateDto } from './dto/create-states.dto';
import { UpdateStateDto } from './dto/update-states.dto';

@ApiTags('State')
@ApiBearerAuth()
@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @ApiOperation({
    description: 'Listagem de estados utilizando filtros.',
    tags: ['State'],
  })
  @Get()
  find(@Query() query: FindStateDto) {
    const { select, ...where } = query;
    return this.stateService.find({ select, where });
  }

  @ApiOperation({
    description: 'Listagem de estado utilizando id.',
    tags: ['State'],
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.stateService.findOne(id);
  }

  @ApiOperation({
    description: 'Criação de estado.',
    tags: ['State'],
  })
  @Post()
  create(@Body() createStateDto: CreateStateDto) {
    return this.stateService.create(createStateDto);
  }

  @ApiOperation({
    description: 'Atualização de estado.',
    tags: ['State'],
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStateDto: UpdateStateDto,
  ) {
    return this.stateService.update(id, updateStateDto);
  }

  @ApiOperation({
    description: 'Deleção de estado.',
    tags: ['State'],
  })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.stateService.remove(id);
  }
}
