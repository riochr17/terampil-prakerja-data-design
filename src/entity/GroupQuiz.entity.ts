import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Quiz } from './Quiz.entity';
import { MaterialQuiz } from './MaterialQuiz.entity';


@Entity('GroupQuiz')
export class GroupQuiz {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => Quiz, quiz => quiz.id)
  @JoinColumn({ name: 'quiz_id' })
  quiz!: Quiz;

  @ManyToOne(() => MaterialQuiz, material_quiz => material_quiz.id)
  @JoinColumn({ name: 'material_quiz_id' })
  material_quiz!: MaterialQuiz;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

