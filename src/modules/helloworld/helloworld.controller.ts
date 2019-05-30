import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { HelloWorldService } from './helloworld.service';

@Controller()
export class HelloWorldController {
  constructor(private readonly helloworldService: HelloWorldService) {}

  @MessagePattern({ cmd: 'hello' })
  async getHello(): Promise<string> {
    return this.helloworldService.getHello();
  }

  @MessagePattern({ cmd: 'appname' })
  async getAppName(): Promise<string> {
    return this.helloworldService.getAppName();
  }

  @MessagePattern({ cmd: 'portms' })
  async getPortMs(): Promise<number> {
    return this.helloworldService.getPortMs();
  }
}
