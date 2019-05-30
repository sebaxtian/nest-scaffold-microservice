import { Module } from '@nestjs/common';
import { LoggerModule } from './modules/logger/logger.module';
import { HelloWorldModule } from './modules/helloworld/helloworld.module';

@Module({
  imports: [LoggerModule, HelloWorldModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
