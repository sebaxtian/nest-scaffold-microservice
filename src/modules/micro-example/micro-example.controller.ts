import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MicroExampleService } from './services/micro-example.service';
import { MicroExampleDto } from './dtos/micro-example.dto';
import { MicroExample } from './interfaces/micro-example.interface';

@Controller('micro-example')
export class MicroExampleController {
  constructor(private readonly microExampleService: MicroExampleService) {}

  @MessagePattern({ cmd: 'mensaje' })
  async getMensaje(): Promise<string> {
    return this.microExampleService.mensaje();
  }

  @MessagePattern({ cmd: 'create' })
  async create(microExampleDto: MicroExampleDto): Promise<MicroExample> {
    const microExample: MicroExample = await this.microExampleService.create(
      microExampleDto,
    );
    return microExample;
  }

  @MessagePattern({ cmd: 'findAll' })
  async findAll(): Promise<MicroExample[]> {
    const listMicroExample: MicroExample[] = await this.microExampleService.findAll();
    return listMicroExample;
  }

  @MessagePattern({ cmd: 'findOne' })
  async findOne(id: string): Promise<MicroExample> {
    const microExample: MicroExample = await this.microExampleService.findOne(
      id,
    );
    return microExample;
  }

  @MessagePattern({ cmd: 'update' })
  async update(id: string): Promise<MicroExample> {
    const microExample: MicroExample = await this.microExampleService.update(
      id,
    );
    return microExample;
  }

  @MessagePattern({ cmd: 'remove' })
  async remove(id: string): Promise<boolean> {
    const isRemove: boolean = await this.microExampleService.remove(id);
    return isRemove;
  }
}
