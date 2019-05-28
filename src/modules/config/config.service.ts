import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';

/**
 * Configuration NestJS to run in different environments
 * See: https://docs.nestjs.com/v5/techniques/configuration
 */

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   *
   * @param envConfig <EnvConfig>
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test', 'provision'])
        .default('development'),
      PORT_MS: Joi.number().default(3100),
      APP_NAME: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  // For each config property, we have to add a getter function.

  get portMs(): number {
    return Number(this.envConfig.PORT_MS);
  }

  get appName(): string {
    return String(this.envConfig.APP_NAME);
  }

}
