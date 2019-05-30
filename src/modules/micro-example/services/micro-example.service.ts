import { Injectable, HttpService } from '@nestjs/common';
import { MicroExample } from '../interfaces/micro-example.interface';
import { MicroExampleDto } from '../dtos/micro-example.dto';
import { UserRepo } from '../interfaces/user-repo.interface';
import shortid = require('shortid');

@Injectable()
export class MicroExampleService {
  listMicroExample: MicroExample[] = [];

  constructor(private readonly httpService: HttpService) {}

  mensaje(): string {
    return 'Mensaje de Micro Example !!';
  }

  async create(microExampleDto: MicroExampleDto): Promise<MicroExample> {
    try {
      const userGithub = microExampleDto.userGithub;
      const userRepos = await this.httpService
        .get('https://api.github.com/users/' + userGithub + '/repos')
        .toPromise();
      const repos: UserRepo[] = userRepos.data.map(dataRepo => {
        const userRepo: UserRepo = {
          name: dataRepo.full_name,
          description: dataRepo.description,
          url: dataRepo.url,
        };
        return userRepo;
      });
      const microExample: MicroExample = {
        id: shortid.generate(),
        userGithub,
        userRepos: repos,
        comment: 'Repositorios de usuario en Github: ' + userGithub,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.listMicroExample.push(microExample);
      return microExample;
    } catch (error) {
      throw error;
    }
  }

  findAll(): MicroExample[] {
    return this.listMicroExample;
  }

  findOne(id: string): MicroExample {
    for (const microExample of this.listMicroExample) {
      if (microExample.id === id) {
        return microExample;
      }
    }
    return null;
  }

  async update(id: string): Promise<MicroExample> {
    const microExample: MicroExample = this.findOne(id);
    if (microExample !== null) {
      const userGithub = microExample.userGithub;
      try {
        const userRepos = await this.httpService
          .get('https://api.github.com/users/' + userGithub + '/repos')
          .toPromise();
        const repos: UserRepo[] = userRepos.data.map(dataRepo => {
          const userRepo: UserRepo = {
            name: dataRepo.full_name,
            description: dataRepo.description,
            url: dataRepo.url,
          };
          return userRepo;
        });
        microExample.userRepos = repos;
        microExample.comment =
          'Repositorios de usuario en Github Actualizado: ' + userGithub;
        microExample.updatedAt = new Date().toISOString();
        // Update
        this.listMicroExample = this.listMicroExample.map(
          dataMicroExample => {
            if (dataMicroExample.id === id) {
              dataMicroExample = microExample;
            }
            return dataMicroExample;
          },
        );
        return microExample;
      } catch (error) {
        throw error;
      }
    } else {
      return null;
    }
  }

  remove(id: string): boolean {
    let isRemove: boolean = false;
    for (let i = 0; i < this.listMicroExample.length; i++) {
      const microExample = this.listMicroExample[i];
      if (microExample !== undefined && microExample.id === id) {
        delete this.listMicroExample[i];
        isRemove = true;
      }
    }
    return isRemove;
  }
}
