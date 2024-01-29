import {Account } from 'ynab';
import AccountManager from './account-manager';

// jest.mock('../cache', ()=> {
//   return jest.fn().mockImplementation(() => {
//     const actual = jest.requireActual('../cache');
//     return {get: function }
//   })
// });

// const MockedCache = mocked(Cache, true);

describe('AccountManager', () => {
  it('intansiates without error', () => {
    new AccountManager();
  });

  xit('properly uses the data cache', async () => {
    const manager = new AccountManager();
    await manager.getAccountByTransferPayee('existing-transfer-id');
    await manager.getAccountByTransferPayee('existing-transfer-id');
    await manager.getAccountByTransferPayee('existing-transfer-id');
    // expect(MockedCache.mock.instances[0].get).toBeCalledTimes(3);
  });

  describe('getAllCreditCards', () => {
    let manager: AccountManager;
    
    beforeEach(() => {
      manager = new AccountManager();
    });

    it('returns the two mocked credit cards', async () => {
      const creditCards = await manager.getAllCreditCards();
      expect(creditCards.filter(account=> account.type === Account.TypeEnum.CreditCard)).toHaveLength(2); 
    });

    it('ignores deleted and closed accounts', async () => {
      const creditCards = await manager.getAllCreditCards();
      expect(creditCards.filter(account=> account.deleted || account.closed)).toHaveLength(0);
    });


  })

  describe('getAcountByTransferPayee', () => {
    let manager: AccountManager;
    beforeEach(() => {
      manager = new AccountManager();
    });

    it('successfully retrieves an existing account', async () => {
      const account = await manager.getAccountByTransferPayee(
        'existing-transfer-id',
      );

      expect(account?.id).toEqual('id-test-transfer');
    });

    it('ignores deleted and closed accounts', async () => {
      const deleted = await manager.getAccountByTransferPayee(
        'closed-transfer-id',
      );

      expect(deleted).toBeUndefined();

      const closed = await manager.getAccountByTransferPayee(
        'closed-transfer-id',
      );

      expect(closed).toBeUndefined();
    });
  });
});
