import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, Length, IsOptional } from 'class-validator';
import { GenericParamsDto } from '../../../common/dtos/generic-params.dto';

class FiltersCategoryDto {
  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 150)
  @IsOptional()
  name?: string;
}

export class ParamsCategoryDto extends GenericParamsDto<FiltersCategoryDto> {}

export class FindCategoryDto extends FiltersCategoryDto {
  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  select?: Array<string>;
}
