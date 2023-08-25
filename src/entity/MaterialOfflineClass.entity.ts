import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserOfflineCheck } from './UserOfflineCheck.entity';
import { SessionMaterial } from './SessionMaterial.entity';


@Entity('MaterialOfflineClass')
export class MaterialOfflineClass {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @OneToMany(() => UserOfflineCheck, _ => _.material_offline_class, {
    cascade: true
  })
  list_user_offline_check_material_offline_class!: UserOfflineCheck[];

  @ManyToOne(() => SessionMaterial, session_material => session_material.id)
  @JoinColumn({ name: 'session_material_id' })
  session_material!: SessionMaterial;

  @Column({
    type: 'text',
    array: false,
    nullable: false
  })
  location!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

