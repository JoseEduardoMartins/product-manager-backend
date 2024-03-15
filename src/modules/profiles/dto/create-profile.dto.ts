import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { Unique } from '../../../common/decorators/is-unique.decorator';
import { Profile } from '../entities/profile.entity';

export class CreateProfileDto {
  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 300)
  @Unique(Profile, 'name')
  name: string;
}
