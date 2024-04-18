import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateResponse } from '../../common/interfaces/repository-response';

const findResponse = [
  new Product({ id: 1, name: 'test-1' }),
  new Product({ id: 2, name: 'test-2' }),
  new Product({ id: 3, name: 'test-3' }),
];

const findOneResponse = new Product({ id: 1, name: 'test-1' });

const createResponse = new Product({ id: 1, name: 'test-1' });

const createdResponse = { id: 1 };

const saveResponse = new Product({ id: 1, name: 'test-1' });

const updateResponse = new UpdateResponse({
  generatedMaps: [],
  raw: [],
  affected: 1,
});

describe('ProductsService', () => {
  let productService: ProductsService;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            find: jest.fn().mockResolvedValue(findResponse),
            findOne: jest.fn().mockResolvedValue(findOneResponse),
            create: jest.fn().mockResolvedValue(createResponse),
            save: jest.fn().mockResolvedValue(saveResponse),
            update: jest.fn().mockResolvedValue(updateResponse),
          },
        },
      ],
    }).compile();

    productService = module.get<ProductsService>(ProductsService);
    productRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
    expect(productRepository).toBeDefined();
  });

  describe('find', () => {
    it('should return a sector entity list successfully', async () => {
      const result = await productService.find();

      expect(result).toEqual(findResponse);
      expect(typeof result).toEqual('object');
      expect(productRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(productRepository, 'find').mockRejectedValueOnce(new Error());
      expect(productService.find()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    const id = 1;

    it('should return a sector entity successfully', async () => {
      const result = await productService.findOne(id);

      expect(result).toEqual(findOneResponse);
      expect(typeof result).toEqual('object');
      expect(productRepository.findOne).toHaveBeenCalledTimes(1);
      expect(productRepository.findOne).toHaveBeenCalledWith({ where: { id } });
    });

    it('should throw an exception', () => {
      jest.spyOn(productService, 'findOne').mockRejectedValueOnce(new Error());
      expect(productService.findOne(id)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    const body: CreateProductDto = {
      name: 'teste-1',
      category_id: 1,
      company_id: 1,
    };

    it('should create a new sector entity successfuly', async () => {
      const result = await productService.create(body);

      expect(result).toEqual(createdResponse);
      expect(productRepository.create).toHaveBeenCalledTimes(1);
      expect(productRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(productRepository, 'save').mockRejectedValueOnce(new Error());
      expect(productService.create(body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    const id = 1;

    const body: UpdateProductDto = {
      name: 'teste-1.1',
    };

    it('should update a sector entity successfuly', async () => {
      const result = await productService.update(id, body);

      expect(result).toBeUndefined();
      expect(productRepository.update).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(productRepository, 'update')
        .mockRejectedValueOnce(new Error());
      expect(productService.update(id, body)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    const id = 1;

    it('should remove a sector entity successfuly', async () => {
      const result = await productService.remove(id);

      expect(result).toBeUndefined();
      expect(productRepository.update).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(productRepository, 'update')
        .mockRejectedValueOnce(new Error());
      expect(productService.remove(id)).rejects.toThrowError();
    });
  });
});
