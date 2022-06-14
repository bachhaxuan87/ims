import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import ProductVariant from './product-variant.entity';

@Entity()
class Product {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public company_id: string;

  @Column({ length: 30 })
  public product_name: string;

  @Column({ nullable: true })
  public min_order: number;

  @Column({ nullable: true })
  public max_order: number;

  @Column()
  public product_type: string;

  @Column({ nullable: true })
  public product_category: string;

  @Column('text', { array: true })
  public images: string[];

  @Column()
  public description: string;

  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  public options!: Array<{ name: string; value: string }>;

  @OneToMany(() => ProductVariant, (productVariant) => productVariant.product, {
    cascade: true,
    eager: true,
  })
  public variants!: ProductVariant[];

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

export default Product;
