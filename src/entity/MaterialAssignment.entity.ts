import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserAssignment } from './UserAssignment.entity';
import { SessionMaterial } from './SessionMaterial.entity';


@Entity('MaterialAssignment')
export class MaterialAssignment {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @OneToMany(() => UserAssignment, _ => _.material_assignment, {
    cascade: true
  })
  list_user_assignment_material_assignment!: UserAssignment[];

  @ManyToOne(() => SessionMaterial, session_material => session_material.id)
  @JoinColumn({ name: 'session_material_id' })
  session_material!: SessionMaterial;

  @Column({
    type: 'varchar',
    length: 255,
    array: false,
    nullable: true
  })
  deadline?: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

