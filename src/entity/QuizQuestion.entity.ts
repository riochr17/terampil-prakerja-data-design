import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { QuestionAnswer } from './QuestionAnswer.entity';
import { UserQuizQuestionAnswer } from './UserQuizQuestionAnswer.entity';
import { MaterialQuiz } from './MaterialQuiz.entity';


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

  @ManyToOne(() => MaterialQuiz, material_quiz => material_quiz.id)
  @JoinColumn({ name: 'material_quiz_id' })
  material_quiz!: MaterialQuiz;

  @Column({
    type: 'text',
    array: false
  })
  question!: string;

  @Column({
    type: 'varchar',
    length: 255,
    array: false
  })
  answer!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

