import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { MyLogger } from './modules/logger/my-logger.service';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from './modules/config/config.service';

async function bootstrap() {
  const configService: ConfigService = new ConfigService(
    `${process.env.NODE_ENV}.env`,
  );
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      port: Number(configService.portMs),
      retryAttempts: 5,
      retryDelay: 3000,
    },
    logger: false,
  });
  /**
   * Logger: https://docs.nestjs.com/v5/techniques/logger
   */
  app.useLogger(app.get(MyLogger));
  /**
   * Validation: https://docs.nestjs.com/v5/techniques/validation
   */
  app.useGlobalPipes(
    new ValidationPipe({
      // disableErrorMessages: true,
      // whitelist: true,
      // transform: true,
    }),
  );
  // Run app
  // tslint:disable-next-line: no-empty
  await app.listen(() => {
    // tslint:disable-next-line: no-console
    console.log(
      'Microservice ' +
        configService.appName +
        ' is listening in port: ' +
        configService.portMs,
    );
  });
}
bootstrap();
