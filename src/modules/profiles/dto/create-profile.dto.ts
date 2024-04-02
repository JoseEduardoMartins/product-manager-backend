import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsArray,
  IsOptional,
  Length,
} from 'class-validator';
import { Unique } from '../../../common/decorators/is-unique.decorator';
import { Profile } from '../entities/profile.entity';
import { CreateFeatureDto } from '../../features/dto/create-feature.dto';

class CreateProfileFeatureDto extends CreateFeatureDto {
  @ApiProperty({ required: true })
  @IsNumber()
  id: number;
}

export class CreateProfileDto {
  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 300)
  @Unique(Profile, 'name')
  name: string;

  @ApiProperty({
    required: false,
    type: [CreateProfileFeatureDto],
  })
  @IsArray()
  @IsOptional()
  features?: CreateProfileFeatureDto[];
}
