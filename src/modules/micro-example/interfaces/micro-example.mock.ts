import { MicroExample } from './micro-example.interface';
import { getUserRepoMock } from './user-repo.mock';
import shortid = require('shortid');
/**
 * Crea una instancia Mock de MicroExample
 */
const getDefaults = async (): Promise<MicroExample> => ({
  id: shortid.generate(),
  userGithub: 'sebaxtian',
  userRepos: [await getUserRepoMock()],
  comment: 'Mock de MicroExample por defecto.',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});
/**
 * Constructor de Instancia Mock de MicroExample
 *
 * https://itnext.io/mocking-in-typescript-a97267f7cea9
 *
 * @export
 * @function getMicroExampleMock
 */
export const getMicroExampleMock = async (
  p?: Partial<MicroExample>,
): Promise<MicroExample> => ({
  ...await getDefaults(),
  ...p,
});
