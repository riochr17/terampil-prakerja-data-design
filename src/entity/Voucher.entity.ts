import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { VoucherUser } from './VoucherUser.entity';


@Entity('Voucher')
export class Voucher {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @OneToMany(() => VoucherUser, _ => _.voucher, {
    cascade: true
  })
  list_voucher_user_voucher!: VoucherUser[];

  @Column({
    type: 'varchar',
    length: 255,
    array: false,
    nullable: false,
    
  })
  code!: string;

  @Column({
    type: 'text',
    array: false,
    nullable: true,
    
  })
  description?: string;

  @Column({
    type: 'int',
    array: false,
    nullable: false,
    
  })
  quota!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

