import { IsString, IsDateString } from 'class-validator';

export class MicroExampleDto {
  @IsString()
  readonly userGithub: string;
  // @IsString()
  // readonly comment: string;
  // @IsDateString()
  // readonly createdAt: string;
  // @IsDateString()
  // readonly updatedAt: string;
}
