import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Training } from './Training.entity';
import { Library } from './Library.entity';


@Entity('TrainingLibrary')
export class TrainingLibrary {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => Training, training => training.id)
  @JoinColumn({ name: 'training_id' })
  training!: Training;

  @ManyToOne(() => Library, library => library.id)
  @JoinColumn({ name: 'library_id' })
  library!: Library;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

