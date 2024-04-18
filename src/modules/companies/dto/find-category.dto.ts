import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { GenericParamsDto } from '../../../common/dtos/generic-params.dto';

class FiltersCompanyDto {
  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 150)
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 300)
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 300)
  @IsOptional()
  linkedin_link?: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 300)
  @IsOptional()
  homepage_link?: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 50)
  @IsOptional()
  tax_id?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  sector_id: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  address_id: number;
}

export class ParamsCompanyDto extends GenericParamsDto<FiltersCompanyDto> {}

export class FindCompanyDto extends FiltersCompanyDto {
  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  select?: Array<string>;
}
