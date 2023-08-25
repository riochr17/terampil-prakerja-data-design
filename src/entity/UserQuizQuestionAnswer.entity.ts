import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserTrainingSchedule } from './UserTrainingSchedule.entity';
import { QuizQuestion } from './QuizQuestion.entity';


@Entity('UserQuizQuestionAnswer')
export class UserQuizQuestionAnswer {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => UserTrainingSchedule, user_training_schedule => user_training_schedule.id)
  @JoinColumn({ name: 'user_training_id' })
  user_training!: UserTrainingSchedule;

  @ManyToOne(() => QuizQuestion, quiz_question => quiz_question.id)
  @JoinColumn({ name: 'quiz_question_id' })
  quiz_question!: QuizQuestion;

  @Column({
    type: 'varchar',
    length: 255,
    array: false,
    nullable: false
  })
  answer!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

