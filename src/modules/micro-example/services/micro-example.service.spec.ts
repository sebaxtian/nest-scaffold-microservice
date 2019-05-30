import { Test, TestingModule } from '@nestjs/testing';
import { MicroExampleService } from './micro-example.service';
import { getMicroExampleMock } from '../interfaces/micro-example.mock';
import { HttpModule, HttpService } from '@nestjs/common';
import { MicroExample } from '../interfaces/micro-example.interface';
import { UserRepo } from '../interfaces/user-repo.interface';
import shortid = require('shortid');

describe('MicroExampleService', () => {
  let service: MicroExampleService;

  // Usuario Github
  let userGithub: string = 'sebaxtian';
  // Repositorios de Usuario Github
  let userRepos: UserRepo[] = [];

  /**
   * Funcion auxiliar para obtener un usuario de Github aleatorio
   */
  const getUserGithub = async (): Promise<string> => {
    try {
      const httpService: HttpService = new HttpService();
      const randomPage = await httpService
        .get(
          'https://api.github.com/users?since=' +
            Math.floor(Math.random() * (100 - 1) + 1),
        )
        .toPromise();
      // console.log('randomPage.data: ', randomPage.data);
      const randomUser =
        randomPage.data[
          Math.floor(Math.random() * (randomPage.data.length - 1) + 1)
        ];
      // console.log('randomUser: ', randomUser);
      return randomUser.login;
    } catch (error) {
      // console.log('ERROR: getUserGithub: ', error);
      throw error;
    }
  };
  const getUserRepos = async (userName: string): Promise<UserRepo[]> => {
    try {
      const httpService: HttpService = new HttpService();
      const repos = await httpService
        .get('https://api.github.com/users/' + userName + '/repos')
        .toPromise();
      const reposUser: UserRepo[] = repos.data.map(dataRepo => {
        const userRepo: UserRepo = {
          name: dataRepo.full_name,
          description: dataRepo.description,
          url: dataRepo.url,
        };
        return userRepo;
      });
      return reposUser;
    } catch (error) {
      throw error;
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [MicroExampleService],
    }).compile();

    service = module.get<MicroExampleService>(MicroExampleService);

    userGithub = await getUserGithub();
    userRepos = await getUserRepos(userGithub);
    // console.log('userGithub: ', userGithub);
    // console.log('userRepos: ', userRepos);
  });

  describe('mensaje', () => {
    it('should be mensaje a micro-example', () => {
      const mensajeTesting: string = 'Mensaje de Micro Example !!';
      const mensaje: string = service.mensaje();
      expect(mensaje).toBe(mensajeTesting);
    });
  });

  describe('create', () => {
    it('should be create a micro-example', async () => {
      const microExampleTesting: MicroExample = await getMicroExampleMock(
        {
          userGithub,
          userRepos,
        },
      );
      const microExample: MicroExample = await service.create({
        userGithub: microExampleTesting.userGithub,
      });
      // console.log('microExample: ', microExample);
      expect(shortid.isValid(microExample.id)).toBe(true);
      expect(microExample.userGithub).toBe(microExampleTesting.userGithub);
      expect(microExample.userRepos).toEqual(microExampleTesting.userRepos);
      expect(microExample.comment).toBe(
        'Repositorios de usuario en Github: ' +
          microExampleTesting.userGithub,
      );
      // tslint:disable-next-line: max-line-length
      expect(microExample.createdAt).toEqual(
        expect.stringMatching(
          /^(\d{4})(-(\d{2}))??(-(\d{2}))??(T(\d{2}):(\d{2})(:(\d{2}))??(\.(\d+))??(([\+\-]{1}\d{2}:\d{2})|Z)??)??$/,
        ),
      );
      // tslint:disable-next-line: max-line-length
      expect(microExample.updatedAt).toEqual(
        expect.stringMatching(
          /^(\d{4})(-(\d{2}))??(-(\d{2}))??(T(\d{2}):(\d{2})(:(\d{2}))??(\.(\d+))??(([\+\-]{1}\d{2}:\d{2})|Z)??)??$/,
        ),
      );
    });
  });

  describe('findAll', () => {
    it('should be findAll a micro-example', async () => {
      await service.create({
        userGithub,
      });
      // console.log('microExampleTesting: ', microExampleTesting);
      const listMicroExample: MicroExample[] = service.findAll();
      // console.log('listMicroExample: ', listMicroExample);
      expect(listMicroExample).not.toBe(null);
      expect(listMicroExample.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('findOne', () => {
    it('should be findOne a micro-example', async () => {
      const microExampleTesting: MicroExample = await service.create({
        userGithub,
      });
      const microExample: MicroExample = service.findOne(
        microExampleTesting.id,
      );
      expect(shortid.isValid(microExampleTesting.id)).toBe(true);
      if (microExample != null) {
        expect(microExample.id).toBe(microExampleTesting.id);
      }
    });
  });

  describe('update', () => {
    it('should be update a micro-example', async () => {
      const microExampleTesting: MicroExample = await service.create({
        userGithub,
      });
      const microExample: MicroExample = await service.update(
        microExampleTesting.id,
      );
      expect(shortid.isValid(microExampleTesting.id)).toBe(true);
      if (microExample != null) {
        expect(microExample.id).toBe(microExampleTesting.id);
        expect(microExample.comment).toBe(
          'Repositorios de usuario en Github Actualizado: ' +
            microExampleTesting.userGithub,
        );
        expect(microExample.updatedAt).not.toBe(microExample.createdAt);
        // tslint:disable-next-line: max-line-length
        expect(microExample.createdAt).toEqual(
          expect.stringMatching(
            /^(\d{4})(-(\d{2}))??(-(\d{2}))??(T(\d{2}):(\d{2})(:(\d{2}))??(\.(\d+))??(([\+\-]{1}\d{2}:\d{2})|Z)??)??$/,
          ),
        );
        // tslint:disable-next-line: max-line-length
        expect(microExample.updatedAt).toEqual(
          expect.stringMatching(
            /^(\d{4})(-(\d{2}))??(-(\d{2}))??(T(\d{2}):(\d{2})(:(\d{2}))??(\.(\d+))??(([\+\-]{1}\d{2}:\d{2})|Z)??)??$/,
          ),
        );
      }
    });
  });

  describe('remove', () => {
    it('should be remove a micro-example', async () => {
      const microExampleTesting: MicroExample = await service.create({
        userGithub,
      });
      const isRemove: boolean = service.remove(microExampleTesting.id);
      expect(shortid.isValid(microExampleTesting.id)).toBe(true);
      expect(isRemove).toBe(true);
    });
  });
});
