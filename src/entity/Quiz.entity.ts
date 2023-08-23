import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MaterialQuiz } from './MaterialQuiz.entity';
import { QuizQuestion } from './QuizQuestion.entity';
import { MaterialQuizType } from './MaterialQuizType.enum';

@Entity('Quiz')
export class Quiz {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @OneToMany(() => MaterialQuiz, _ => _.quiz, {
    cascade: true
  })
  list_material_quiz_quiz!: MaterialQuiz[];

  @OneToMany(() => QuizQuestion, _ => _.quiz, {
    cascade: true
  })
  list_quiz_question_quiz!: QuizQuestion[];

  @Column({
    type: 'enum',
    enum: MaterialQuizType,
    array: false
  })
  type!: MaterialQuizType;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

