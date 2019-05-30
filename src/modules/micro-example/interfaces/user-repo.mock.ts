import { UserRepo } from './user-repo.interface';
/**
 * Crea una instancia Mock de UserRepo
 */
const getDefaults = (): UserRepo => ({
  name: 'sebaxtian',
  description: 'Configuración de scaffold para crear Microservicio usando el Framework NestJS',
  url: 'https://github.com/sebaxtian/nest-scaffold-api-gateway',
});
/**
 * Constructor de Instancia Mock de UserRepo
 *
 * https://itnext.io/mocking-in-typescript-a97267f7cea9
 *
 * @export
 * @function getUserRepoMock
 */
export const getUserRepoMock = async (
  p?: Partial<UserRepo>,
): Promise<UserRepo> => ({
  ...getDefaults(),
  ...p,
});
