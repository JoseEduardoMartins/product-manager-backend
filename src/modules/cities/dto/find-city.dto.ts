import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsObject,
  IsArray,
  Length,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

class FiltersCityDto {
  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 300)
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  state_id?: number;
}

export class ParamsCityDto {
  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  select?: object;

  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  where?: FiltersCityDto;
}

export class FindCityDto extends FiltersCityDto {
  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  select?: Array<string>;
}
