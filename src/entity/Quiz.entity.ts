import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { GroupQuiz } from './GroupQuiz.entity';
import { QuizQuestion } from './QuizQuestion.entity';


@Entity('Quiz')
export class Quiz {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @OneToMany(() => GroupQuiz, _ => _.quiz, {
    cascade: true
  })
  list_group_quiz_quiz!: GroupQuiz[];

  @OneToMany(() => QuizQuestion, _ => _.quiz, {
    cascade: true
  })
  list_quiz_question_quiz!: QuizQuestion[];

  @Column({
    type: 'varchar',
    length: 255,
    array: false,
    nullable: false
  })
  label!: string;

  @Column({
    type: 'text',
    array: false,
    nullable: true
  })
  description?: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

