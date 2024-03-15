import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, Length, IsOptional } from 'class-validator';
import { GenericParamsDto } from '../../../common/dtos/generic-params.dto';

class FiltersProfileDto {
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
}

export class ParamsProfileDto extends GenericParamsDto<FiltersProfileDto> {}

export class FindProfileDto extends FiltersProfileDto {
  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  select?: Array<string>;
}
