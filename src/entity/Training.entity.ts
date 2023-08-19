import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TrainingSession } from './TrainingSession.entity';
import { TrainingSchedule } from './TrainingSchedule.entity';
import { TrainingLibrary } from './TrainingLibrary.entity';
import { Trainer } from './Trainer.entity';
import { TrainingType } from './TrainingType.enum';

@Entity('Training')
export class Training {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @OneToMany(() => TrainingSession, _ => _.training, {
    cascade: true
  })
  list_training_session_training!: TrainingSession[];

  @OneToMany(() => TrainingSchedule, _ => _.training, {
    cascade: true
  })
  list_training_schedule_training!: TrainingSchedule[];

  @OneToMany(() => TrainingLibrary, _ => _.training, {
    cascade: true
  })
  list_training_library_training!: TrainingLibrary[];

  @ManyToOne(() => Trainer, trainer => trainer.id)
  @JoinColumn({ name: 'trainer_id' })
  trainer!: Trainer;

  @Column({
    type: 'varchar',
    length: 255,
    array: false
  })
  course_code!: string;

  @Column({
    type: 'enum',
    enum: TrainingType,
    array: false
  })
  type!: TrainingType;

  @Column({
    type: 'varchar',
    length: 255,
    array: false
  })
  title!: string;

  @Column({
    type: 'text',
    array: false
  })
  description!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

