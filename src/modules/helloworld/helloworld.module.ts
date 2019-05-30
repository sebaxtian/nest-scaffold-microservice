import { Module } from '@nestjs/common';
import { HelloWorldController } from './helloworld.controller';
import { HelloWorldService } from './helloworld.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [HelloWorldController],
  providers: [HelloWorldService],
})
export class HelloWorldModule {}
