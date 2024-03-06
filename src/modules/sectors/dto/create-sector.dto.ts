import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateSectorDto {
  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 150)
  name: string;
}
