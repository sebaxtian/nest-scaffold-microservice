import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

@Injectable()
export class HelloWorldService {
  private appName: string;
  private portMs: number;

  constructor(config: ConfigService) {
    this.appName = config.appName;
    this.portMs = config.portMs;
  }

  async getAppName(): Promise<string> {
    return await this.appName;
  }

  async getPortMs(): Promise<number> {
    return await this.portMs;
  }

  async getHello(): Promise<string> {
    return await 'Hello World!';
  }
}
