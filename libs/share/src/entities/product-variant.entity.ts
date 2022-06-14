import {
  Check,
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import Product from './product.entity';

@Entity()
class ProductVariant {
  @PrimaryColumn()
  id: string;

  @Column('int', { array: true })
  options: number[];

  @Column()
  currency: string;

  @Column()
  price: number;

  @Column()
  sku: string;

  @Column({ default: 'active' })
  status: string;

  @Column({ default: 0 })
  quantity: number;

  @Column()
  @Check('"stock" >= 0')
  stock: number;

  @Column()
  weight: number;

  @ManyToOne(() => Product, (product) => product.variants, {
    orphanedRowAction: 'delete',
  })
  product!: Product;

  @DeleteDateColumn()
  deletedAt?: Date;
}

export default ProductVariant;
