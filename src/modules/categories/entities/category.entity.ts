import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'category' })
export class Category {
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

  constructor(category?: Partial<Category>) {
    this.id = category?.id;
    this.name = category?.name;
  }
}
