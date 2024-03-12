import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 300,
  })
  name: string;

  @Column({
    name: 'birthdate',
    type: 'date',
  })
  birthdate: Date;

  @Column({
    name: 'phone',
    type: 'varchar',
    length: 50,
  })
  phone: string;

  @Column({
    name: 'tax_id',
    type: 'varchar',
    length: 50,
  })
  tax_id: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 150,
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 300,
  })
  password: string;

  @Column({
    name: 'photo',
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  photo?: string;

  @Column({
    name: 'security_code',
    type: 'varchar',
    length: 6,
    nullable: true,
  })
  security_code?: string;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
  })
  is_active: boolean;

  @Column({
    name: 'is_verified',
    type: 'boolean',
    default: false,
  })
  is_verified: boolean;

  @Column({
    name: 'is_deleted',
    type: 'boolean',
    default: false,
  })
  is_deleted: boolean;

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

  @Column({
    name: 'deleted_at',
    type: 'datetime',
    nullable: true,
  })
  deleted_at?: Date;

  @Column({
    name: 'address_id',
    type: 'int',
    nullable: true,
  })
  address_id?: number;

  constructor(user?: Partial<User>) {
    this.id = user?.id;
    this.name = user?.name;
    this.birthdate = user?.birthdate;
    this.phone = user?.phone;
    this.tax_id = user?.tax_id;
    this.email = user?.email;
    this.password = user?.password;
    this.security_code = user?.security_code;
    this.address_id = user?.address_id;
  }
}
