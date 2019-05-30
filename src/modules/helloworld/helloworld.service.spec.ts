import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '../config/config.service';
import { HelloWorldService } from './helloworld.service';
import { ConfigModule } from '../config/config.module';

describe('HelloWorldService', () => {
  let service: HelloWorldService;
  let configService: ConfigService;

  beforeEach(async () => {
    configService = new ConfigService(`${process.env.NODE_ENV}.env`);

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [HelloWorldService],
    }).compile();

    service = module.get<HelloWorldService>(HelloWorldService);
  });

  describe('hello', () => {
    it('should be hello a helloworld', async () => {
      const helloTesting: string = 'Hello World!';
      const hello: string = await service.getHello();
      expect(hello).toBe(helloTesting);
    });
  });

  describe('appname', () => {
    it('should be appname a helloworld', async () => {
      const appnameTesting: string = configService.appName;
      const appname: string = await service.getAppName();
      expect(appname).toBe(appnameTesting);
    });
  });

  describe('portms', () => {
    it('should be portms a helloworld', async () => {
      const portmsTesting: number = configService.portMs;
      const portms: number = await service.getPortMs();
      expect(portms).toBe(portmsTesting);
    });
  });
});
