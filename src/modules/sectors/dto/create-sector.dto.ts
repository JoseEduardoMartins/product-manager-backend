import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { Unique } from '../../../common/decorators/is-unique.decorator';
import { Sector } from '../entities/sector.entity';

export class CreateSectorDto {
  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 150)
  @Unique(Sector, 'name')
  name: string;
}
