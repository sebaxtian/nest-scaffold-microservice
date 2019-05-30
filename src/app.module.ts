import { Module } from '@nestjs/common';
import { LoggerModule } from './modules/logger/logger.module';
import { HelloWorldModule } from './modules/helloworld/helloworld.module';
import { MicroExampleModule } from './modules/micro-example/micro-example.module';

@Module({
  imports: [LoggerModule, HelloWorldModule, MicroExampleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
