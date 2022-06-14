import {
  Check,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
class ProductCategory {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public company_id: string;

  @Column()
  public category_name: string;

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;
}

export default ProductCategory;