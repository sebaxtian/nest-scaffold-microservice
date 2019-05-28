import { Module } from '@nestjs/common';
import { MyLogger } from './my-logger.service';

/**
 * Logger: https://docs.nestjs.com/v5/techniques/logger
 */

@Module({
  providers: [MyLogger],
  exports: [MyLogger],
})
export class LoggerModule {}
