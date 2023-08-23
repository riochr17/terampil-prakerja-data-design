import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SessionMaterial } from './SessionMaterial.entity';
import { Quiz } from './Quiz.entity';
import { MaterialQuizType } from './MaterialQuizType.enum';

@Entity('MaterialQuiz')
export class MaterialQuiz {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => SessionMaterial, session_material => session_material.id)
  @JoinColumn({ name: 'session_material_id' })
  session_material!: SessionMaterial;

  @ManyToOne(() => Quiz, quiz => quiz.id)
  @JoinColumn({ name: 'quiz_id' })
  quiz!: Quiz;

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

