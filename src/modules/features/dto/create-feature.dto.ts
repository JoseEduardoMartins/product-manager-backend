import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsEnum,
  IsOptional,
  Length,
} from 'class-validator';
import { Unique } from '../../../common/decorators/is-unique.decorator';
import { Feature } from '../entities/feature.entity';

enum Route {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export class CreateFeatureDto {
  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 300)
  @Unique(Feature, 'name')
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 600)
  @IsOptional()
  description?: string;

  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 100)
  baseurl: string;

  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 100)
  route: string;

  @ApiProperty({ required: true, enum: ['GET', 'POST', 'PATCH', 'DELETE'] })
  @IsString()
  @IsEnum(Route)
  method: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
