import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsObject,
  IsArray,
  Length,
  IsOptional,
} from 'class-validator';

class FiltersStateDto {
  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 300)
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 4)
  @IsOptional()
  short_name?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  country_id?: number;
}

export class ParamsStateDto {
  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  select?: object;

  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  where?: FiltersStateDto;
}

export class FindStateDto extends FiltersStateDto {
  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  select?: Array<string>;
}
