import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import redisConfig from '@app/config/redis.config';

@Module({
  imports: [
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [redisConfig.KEY],
      useFactory: async (config: ConfigType<typeof redisConfig>) => ({
        readyLog: true,
        config: {
          host: config.host,
          port: config.port,
          password: config.password,
        },
      }),
    }),
  ],
})
export class RedisDbModule {}
