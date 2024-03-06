import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'sector' })
export class Sector {
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

  constructor(sector?: Partial<Sector>) {
    this.id = sector?.id;
    this.name = sector?.name;
  }
}
