import { registerAs } from '@nestjs/config';

export default registerAs('redisdb', () => ({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || '6379'), 
  password: process.env.REDIS_PASSWORD,
}));
