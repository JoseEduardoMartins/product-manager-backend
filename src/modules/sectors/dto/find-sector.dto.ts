import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, Length, IsOptional } from 'class-validator';
import { GenericParamsDto } from '../../../common/dtos/generic-params.dto';

class FiltersSectorDto {
  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 150)
  @IsOptional()
  name?: string;
}

export class ParamsSectorDto extends GenericParamsDto<FiltersSectorDto> {}

export class FindSectorDto extends FiltersSectorDto {
  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  select?: Array<string>;
}
