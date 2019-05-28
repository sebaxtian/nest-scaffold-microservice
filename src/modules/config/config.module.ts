import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

/**
 * Configuration NestJS to run in different environments
 * See: https://docs.nestjs.com/v5/techniques/configuration
 */

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(`${process.env.NODE_ENV}.env`),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
