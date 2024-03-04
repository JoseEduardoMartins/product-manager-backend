import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsObject,
  IsArray,
  Length,
  IsOptional,
} from 'class-validator';

class FiltersCountryDto {
  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 300)
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 4)
  @IsOptional()
  isocode?: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 50)
  @IsOptional()
  phonecode?: string;
}

export class ParamsCountryDto {
  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  select?: object;

  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  where?: FiltersCountryDto;
}

export class FindCountryDto extends FiltersCountryDto {
  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  select?: Array<string>;
}
