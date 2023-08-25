import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { QuizQuestion } from './QuizQuestion.entity';


@Entity('QuestionAnswer')
export class QuestionAnswer {
  @PrimaryGeneratedColumn('increment')
  id!: number;

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

