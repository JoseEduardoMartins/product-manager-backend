import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'company' })
export class Company {
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
    name: 'linkedin_link',
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  linkedin_link?: string;

  @Column({
    name: 'homepage_link',
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  homepage_link?: string;

  @Column({
    name: 'tax_id',
    type: 'varchar',
    length: 50,
  })
  tax_id: string;

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
    name: 'sector_id',
    type: 'int',
  })
  sector_id: number;

  @Column({
    name: 'address_id',
    type: 'int',
  })
  address_id: number;

  constructor(company?: Partial<Company>) {
    this.id = company?.id;
    this.name = company?.name;
    this.description = company?.description;
    this.linkedin_link = company?.linkedin_link;
    this.homepage_link = company?.homepage_link;
    this.created_at = company?.created_at;
    this.updated_at = company?.updated_at;
    this.sector_id = company?.sector_id;
    this.address_id = company?.address_id;
  }
}
