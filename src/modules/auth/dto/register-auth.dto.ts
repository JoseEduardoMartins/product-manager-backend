import { PartialType } from '@nestjs/swagger';
import { CreateAuthDto } from './login-auth.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
