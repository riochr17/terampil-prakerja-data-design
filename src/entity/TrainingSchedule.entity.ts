import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserTrainingSchedule } from './UserTrainingSchedule.entity';
import { Training } from './Training.entity';


@Entity('TrainingSchedule')
export class TrainingSchedule {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @OneToMany(() => UserTrainingSchedule, _ => _.training_schedule, {
    cascade: true
  })
  list_user_training_schedule_training_schedule!: UserTrainingSchedule[];

  @ManyToOne(() => Training, training => training.id)
  @JoinColumn({ name: 'training_id' })
  training!: Training;

  @Column({
    type: 'varchar',
    length: 255,
    array: false
  })
  title!: string;

  @Column({
    type: 'varchar',
    length: 255,
    array: false
  })
  description!: string;

  @Column({
    type: 'date',
    array: false
  })
  start_date!: any;

  @Column({
    type: 'date',
    array: false
  })
  end_date!: any;

  @Column({
    type: 'int',
    array: false
  })
  quota!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

