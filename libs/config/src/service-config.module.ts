import { Module } from '@nestjs/common';
import redisConfig from './redis.config';
import { ConfigModule } from '@nestjs/config';
import postgresConfig from './postgres.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [postgresConfig, redisConfig],
      isGlobal: true,
      cache: true,
    }),   
  ],
  providers: [],
  exports: [],
})
export class ServiceConfigModule {}
