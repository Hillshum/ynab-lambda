import PayeeManager from './payee-manager';
import { API } from 'ynab'
import * as constants from '../constants'
import { mocked } from 'ts-jest/utils';

const api: API = new API(constants.ACCESS_TOKEN)

const apiMock = mocked(api);
let manager: PayeeManager;

beforeEach(() => {
 manager = new PayeeManager(api, constants.BUDGET_ID);
})


test('should correctly get the transfer payee', async ()=> {
  expect(await manager.getTransferPayee('venmo-account-id')).toBe('venmo-transfer-id')
})

test('should throw if the transfer payee cannot be found', async ()=> {
  await expect(manager.getTransferPayee('this id does not exist')).rejects.toThrow()
})

test('should only call the YNAB api once for a number of sequential requests', async ()=> {
  await manager.getTransferPayee('venmo-account-id');
  await manager.getTransferPayee('venmo-account-id');

  expect(apiMock.payees.getPayees).toHaveBeenCalledTimes(1);
})

test('should only call the YNAB api once for a number of parallel requests', async ()=> {
  await Promise.all([
    manager.getTransferPayee('venmo-account-id'),
    manager.getTransferPayee('venmo-account-id'),
  ]);

  expect(apiMock.payees.getPayees).toHaveBeenCalledTimes(1);
})