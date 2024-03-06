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
import { AddressService } from './address.service';
import { FindAddressDto } from './dto/find-address.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@ApiTags('Address')
@ApiBearerAuth()
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiOperation({
    description: 'Listagem de endereços utilizando filtros.',
    tags: ['Address'],
  })
  @Get()
  find(@Query() query: FindAddressDto) {
    const { select, ...where } = query;
    return this.addressService.find({ select, where });
  }

  @ApiOperation({
    description: 'Listagem de endereço utilizando id.',
    tags: ['Address'],
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.addressService.findOne(id);
  }

  @ApiOperation({
    description: 'Criação de endereço.',
    tags: ['Address'],
  })
  @Post()
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @ApiOperation({
    description: 'Atualização de endereço.',
    tags: ['Address'],
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressService.update(id, updateAddressDto);
  }

  @ApiOperation({
    description: 'Deleção de endereço.',
    tags: ['Address'],
  })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.addressService.remove(id);
  }
}
