import PayeeManager from './payee-manager';
import { API } from 'ynab';
import * as constants from '../constants';

const api: API = new API(constants.ACCESS_TOKEN);

jest.mocked(api);
let manager: PayeeManager;

beforeEach(() => {
  manager = new PayeeManager(api, constants.BUDGET_ID);
});

test('should correctly get the transfer payee', async () => {
  expect(await manager.getTransferPayee('venmo-account-id')).toBe(
    'venmo-transfer-id',
  );
});

test('should throw if the transfer payee cannot be found', async () => {
  await expect(
    manager.getTransferPayee('this id does not exist'),
  ).rejects.toThrow();
});
