import { PartialType } from '@nestjs/swagger';
import { CreateCompanyDto } from './create-category.dto';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}
