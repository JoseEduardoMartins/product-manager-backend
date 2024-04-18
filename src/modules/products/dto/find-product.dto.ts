import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, Length, IsOptional } from 'class-validator';
import { GenericParamsDto } from '../../../common/dtos/generic-params.dto';

class FilterProductDto {
  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 150)
  @IsOptional()
  name?: string;
}

export class ParamsProductDto extends GenericParamsDto<FilterProductDto> {}

export class FindProductDto extends FilterProductDto {
  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  select?: Array<string>;
}
