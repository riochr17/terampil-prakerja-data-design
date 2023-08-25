import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TrainingLibrary } from './TrainingLibrary.entity';
import { LibraryType } from './LibraryType.enum';

@Entity('Library')
export class Library {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @OneToMany(() => TrainingLibrary, _ => _.library, {
    cascade: true
  })
  list_training_library_library!: TrainingLibrary[];

  @Column({
    type: 'varchar',
    length: 255,
    array: false,
    nullable: false
  })
  title!: string;

  @Column({
    type: 'text',
    array: false,
    nullable: true
  })
  description?: string;

  @Column({
    type: 'enum',
    enum: LibraryType,
    array: false
  })
  type!: LibraryType;

  @Column({
    type: 'text',
    array: false,
    nullable: false
  })
  content_url!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

