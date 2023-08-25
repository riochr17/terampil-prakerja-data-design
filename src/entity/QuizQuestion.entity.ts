import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { QuestionAnswer } from './QuestionAnswer.entity';
import { UserQuizQuestionAnswer } from './UserQuizQuestionAnswer.entity';
import { Quiz } from './Quiz.entity';


@Entity('QuizQuestion')
export class QuizQuestion {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @OneToMany(() => QuestionAnswer, _ => _.quiz_question, {
    cascade: true
  })
  list_question_answer_quiz_question!: QuestionAnswer[];

  @OneToMany(() => UserQuizQuestionAnswer, _ => _.quiz_question, {
    cascade: true
  })
  list_user_quiz_question_answer_quiz_question!: UserQuizQuestionAnswer[];

  @ManyToOne(() => Quiz, quiz => quiz.id)
  @JoinColumn({ name: 'quiz_id' })
  quiz!: Quiz;

  @Column({
    type: 'text',
    array: false,
    nullable: false
  })
  question!: string;

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

