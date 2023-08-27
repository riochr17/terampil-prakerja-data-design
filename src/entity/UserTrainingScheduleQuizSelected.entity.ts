import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Quiz } from './Quiz.entity';
import { MaterialQuiz } from './MaterialQuiz.entity';
import { UserTrainingSchedule } from './UserTrainingSchedule.entity';


@Entity('UserTrainingScheduleQuizSelected')
export class UserTrainingScheduleQuizSelected {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => Quiz, quiz => quiz.id)
  @JoinColumn({ name: 'quiz_id' })
  quiz!: Quiz;

  @ManyToOne(() => MaterialQuiz, material_quiz => material_quiz.id)
  @JoinColumn({ name: 'material_quiz_id' })
  material_quiz!: MaterialQuiz;

  @ManyToOne(() => UserTrainingSchedule, user_training_schedule => user_training_schedule.id)
  @JoinColumn({ name: 'user_training_schedule_id' })
  user_training_schedule!: UserTrainingSchedule;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

