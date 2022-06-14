import { ServiceConfigModule } from '@app/config/service-config.module';
import { PostgresdbModule } from '@app/postgredb/postgredb.module';
import { RedisDbModule } from '@app/redisdb/redisdb.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ServiceConfigModule,
    PostgresdbModule,
    RedisDbModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
