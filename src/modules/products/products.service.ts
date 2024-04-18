import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericCreateResponse } from 'src/common/interfaces/generic-response';
import { Product } from './entities/product.entity';
import { ParamsProductDto } from './dto/find-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  find(paramsProductDto?: ParamsProductDto): Promise<Product[]> {
    return this.productRepository.find(paramsProductDto);
  }

  findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }

  async create(
    createProductDto: CreateProductDto,
  ): Promise<GenericCreateResponse> {
    const data = {
      ...createProductDto,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const product = this.productRepository.create(data);
    const response = await this.productRepository.save(product);
    return { id: response.id };
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<void> {
    const data = {
      ...updateProductDto,
      updated_at: new Date(),
    };

    const response = await this.productRepository.update({ id }, data);
    if (response?.affected === 0) return null;
  }

  async remove(id: number): Promise<void> {
    const data = {
      is_active: false,
      is_deleted: true,
      deleted_at: new Date(),
    };

    const response = await this.productRepository.update({ id }, data);
    if (response?.affected === 0) return null;
  }
}
