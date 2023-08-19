import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { QuizQuestion } from './QuizQuestion.entity';
import { SessionMaterial } from './SessionMaterial.entity';
import { MaterialQuizType } from './MaterialQuizType.enum';

@Entity('MaterialQuiz')
export class MaterialQuiz {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @OneToMany(() => QuizQuestion, _ => _.material_quiz, {
    cascade: true
  })
  list_quiz_question_material_quiz!: QuizQuestion[];

  @ManyToOne(() => SessionMaterial, session_material => session_material.id)
  @JoinColumn({ name: 'session_material_id' })
  session_material!: SessionMaterial;

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

