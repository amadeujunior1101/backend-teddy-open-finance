import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'
import { UserModel } from './user.model'

@Entity({
  name: 'shortener',
})
@Unique('unique_model_shortener_id', ['id'])
@Unique('unique_model_code_shortener_url', ['codeShortenerUrl'])
export class ShortenerModel {
  @PrimaryColumn({
    name: 'id',
    primaryKeyConstraintName: 'shortener_pk_id',
    type: 'uuid',
  })
  id!: string

  @Column({ name: 'original_url', type: 'varchar', length: 200 })
  originalUrl!: string

  @Column({ name: 'code_shortener_url', type: 'varchar', length: 100 })
  codeShortenerUrl!: string

  @ManyToOne(() => UserModel, (user) => user)
  @JoinColumn({
    name: 'user_id', // Nome da coluna na tabela `shortener`
    foreignKeyConstraintName: 'fk_model_shortener_user', // Nome da constraint da chave estrangeira
  })
  user!: UserModel // Define a relação entre o Shortener e o User

  @Column({ name: 'clicks', type: 'int', default: 0 }) // Adiciona o campo de cliques
  clicks!: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date

  @DeleteDateColumn({ name: 'deletedAt_at', nullable: true })
  deletedAt!: Date

  // @JoinColumn({
  //   name: 'user_id',
  //   foreignKeyConstraintName: 'fk_model_shortener_user',
  // })
  // @Column({ name: 'date_and_time', type: 'jsonb' })
  // dateAndTime: IPeriod[];
  // @Column({ name: 'date_and_time', type: 'timestamp' })
  // dateAndTime: Date;
  // @OneToMany(() => UserModel, (event) => event, { onDelete: 'CASCADE', nullable: true })
  // user: Partial<UserEntity> & Pick<UserEntity, 'id'>;

  // certifiedMapping?: Partial<CertifiedMappingEntity> &
  //   Pick<CertifiedMappingEntity, 'id'>;
}
