import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Training } from './Training.entity';


@Entity('TrainingCompetency')
export class TrainingCompetency {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => Training, training => training.id)
  @JoinColumn({ name: 'training_id' })
  training!: Training;

  @Column({
    type: 'varchar',
    length: 255,
    array: false,
    nullable: false,
    
  })
  label!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

