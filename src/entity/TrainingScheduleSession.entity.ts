import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TrainingSchedule } from './TrainingSchedule.entity';
import { TrainingSession } from './TrainingSession.entity';


@Entity('TrainingScheduleSession')
export class TrainingScheduleSession {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => TrainingSchedule, training_schedule => training_schedule.id)
  @JoinColumn({ name: 'training_schedule_id' })
  training_schedule!: TrainingSchedule;

  @ManyToOne(() => TrainingSession, training_session => training_session.id)
  @JoinColumn({ name: 'training_session_id' })
  training_session!: TrainingSession;

  @Column({
    type: 'timestamp',
    array: false
  })
  begin!: Date;

  @Column({
    type: 'timestamp',
    array: false
  })
  end!: Date;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

