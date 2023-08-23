import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TrainingSchedule } from './TrainingSchedule.entity';
import { Training } from './Training.entity';


@Entity('TrainingLocation')
export class TrainingLocation {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @OneToMany(() => TrainingSchedule, _ => _.training_location, {
    cascade: true
  })
  list_training_schedule_training_location!: TrainingSchedule[];

  @ManyToOne(() => Training, training => training.id)
  @JoinColumn({ name: 'training_id' })
  training!: Training;

  @Column({
    type: 'varchar',
    length: 255,
    array: false
  })
  city_name!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

