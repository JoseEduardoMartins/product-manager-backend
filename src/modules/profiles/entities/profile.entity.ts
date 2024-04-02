import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Feature } from '../../features/entities/feature.entity';

@Entity({ name: 'profile' })
export class Profile {
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
    name: 'is_active',
    type: 'boolean',
    default: true,
  })
  is_active: boolean;

  @ManyToMany(() => Feature)
  @JoinTable()
  features: Feature[];

  constructor(profile?: Partial<Profile>) {
    this.id = profile?.id;
    this.name = profile?.name;
    this.is_active = profile?.is_active;
  }
}
