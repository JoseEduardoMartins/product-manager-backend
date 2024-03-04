import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Country {
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
    name: 'isocode',
    type: 'varchar',
    length: 4,
    nullable: true,
  })
  isocode?: string;

  @Column({
    name: 'phonecode',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  phonecode?: string;
}
