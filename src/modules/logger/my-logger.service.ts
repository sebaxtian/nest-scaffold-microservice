import { Logger } from '@nestjs/common';
import * as fs from 'fs';

/**
 * Logger: https://docs.nestjs.com/v5/techniques/logger
 */

export class MyLogger extends Logger {
  log(message: any, context?: string) {
    // add your custom business logic
    super.log(message, context);
  }

  error(message: any, trace?: string, context?: string) {
    // add your custom business logic
    const errorLog =
      new Date().toISOString() +
      '\n' +
      JSON.stringify(message) +
      '\n' +
      trace +
      '\n' +
      context +
      '\n\n';
    fs.appendFile('./logs/error.log', errorLog, err => {
      if (err) {
        // throw err;
        super.error(message, trace, context);
      }
      super.error(message, trace, context);
    });
  }

  warn(message: any, context?: string) {
    // add your custom business logic
    super.warn(message, context);
  }

  debug(message: any, context?: string) {
    // add your custom business logic
    super.debug(message, context);
  }

  verbose(message: any, context?: string) {
    // add your custom business logic
    super.verbose(message, context);
  }
}
