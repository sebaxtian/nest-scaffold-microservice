import { Module, HttpModule } from '@nestjs/common';
import { MicroExampleService } from './services/micro-example.service';
import { MicroExampleController } from './micro-example.controller';

@Module({
  imports: [HttpModule],
  providers: [MicroExampleService],
  controllers: [MicroExampleController],
})
export class MicroExampleModule {}
