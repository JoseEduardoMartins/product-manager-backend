import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'feature' })
export class Feature {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    unique: true,
    length: 300,
  })
  name: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 600,
    nullable: true,
  })
  description?: string;

  @Column({
    name: 'baseurl',
    type: 'varchar',
    length: 100,
  })
  baseurl: string;

  @Column({
    name: 'route',
    type: 'varchar',
    length: 100,
  })
  route: string;

  @Column({
    name: 'method',
    type: 'enum',
    enum: ['GET', 'POST', 'PATCH', 'DELETE'],
  })
  method: string;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
  })
  is_active: boolean;

  @Column({
    name: 'created_at',
    type: 'datetime',
    nullable: true,
  })
  created_at?: Date;

  @Column({
    name: 'updated_at',
    type: 'datetime',
    nullable: true,
  })
  updated_at?: Date;

  constructor(feature?: Partial<Feature>) {
    this.id = feature?.id;
    this.name = feature?.name;
    this.description = feature?.description;
    this.baseurl = feature?.baseurl;
    this.route = feature?.route;
    this.method = feature?.method;
    this.is_active = feature?.is_active;
    this.created_at = feature?.created_at;
    this.updated_at = feature?.updated_at;
  }
}
