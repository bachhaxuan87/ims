import { RedisDbModule } from '@app/redisdb';
import { Module } from '@nestjs/common';
import { PostgresdbModule } from '@app/postgredb';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { ServiceConfigModule } from '@app/config/service-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import Product from '@app/share/entities/product.entity';
import ProductVariant from '@app/share/entities/product-variant.entity';

@Module({
  imports: [
    ServiceConfigModule,
    PostgresdbModule,
    RedisDbModule,
    TypeOrmModule.forFeature([Product, ProductVariant]),
  ],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
