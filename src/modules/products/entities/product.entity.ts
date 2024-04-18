import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 150,
  })
  name: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  description?: string;

  @Column({
    name: 'brand',
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  brand?: string;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
  })
  is_active: boolean;

  @Column({
    name: 'is_deleted',
    type: 'boolean',
    default: false,
    nullable: true,
  })
  is_deleted?: boolean;

  @Column({
    name: 'created_at',
    type: 'datetime',
  })
  created_at: Date;

  @Column({
    name: 'updated_at',
    type: 'datetime',
    nullable: true,
  })
  updated_at?: Date;

  @Column({
    name: 'deleted_at',
    type: 'datetime',
    nullable: true,
  })
  deleted_at?: Date;

  @Column({
    name: 'category_id',
    type: 'int',
  })
  category_id: number;

  @Column({
    name: 'category_id',
    type: 'int',
  })
  company_id: number;

  constructor(product?: Partial<Product>) {
    this.id = product?.id;
    this.name = product?.name;
    this.description = product?.description;
    this.brand = product?.brand;
    this.is_active = product?.is_active;
    this.is_deleted = product?.is_deleted;
    this.created_at = product?.created_at;
    this.updated_at = product?.updated_at;
    this.deleted_at = product?.deleted_at;
    this.category_id = product?.category_id;
    this.company_id = product?.company_id;
  }
}
