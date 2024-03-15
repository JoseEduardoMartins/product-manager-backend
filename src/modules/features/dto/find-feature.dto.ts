import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsDate,
  IsArray,
  IsBoolean,
  IsEnum,
  Length,
  IsOptional,
} from 'class-validator';
import { GenericParamsDto } from '../../../common/dtos/generic-params.dto';

enum Route {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

class FiltersFeatureDto {
  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 300)
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 600)
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 100)
  @IsOptional()
  baseurl?: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 100)
  @IsOptional()
  route?: string;

  @ApiProperty({ required: false, enum: ['GET', 'POST', 'PATCH', 'DELETE'] })
  @IsString()
  @IsEnum(Route)
  @IsOptional()
  method?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  created_at?: Date;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  updated_at?: Date;
}

export class ParamsFeatureDto extends GenericParamsDto<FiltersFeatureDto> {}

export class FindFeatureDto extends FiltersFeatureDto {
  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  select?: Array<string>;
}
