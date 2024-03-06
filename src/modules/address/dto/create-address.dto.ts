import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, Length } from 'class-validator';
import { Exist } from 'src/common/decorators/is-exist.decorator';
import { Country } from 'src/modules/countries/entities/country.entity';
import { State } from 'src/modules/states/entities/state.entity';
import { City } from 'src/modules/cities/entities/city.entity';

export class CreateAddressDto {
  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 300)
  street: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(0, 300)
  complement?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  number?: number;

  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 50)
  zipcode: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @Exist(Country, 'id')
  country_id: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @Exist(State, 'id')
  state_id: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @Exist(City, 'id')
  city_id: number;
}
