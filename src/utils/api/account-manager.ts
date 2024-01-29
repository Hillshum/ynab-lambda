import { Account, AccountsResponse } from 'ynab';
import Cache from '../cache';
import { BUDGET_ID } from '../constants';
import { api } from './api';

class AccountManager {
  private cache: Cache<AccountsResponse>;

  constructor() {
    this.cache = new Cache<AccountsResponse>(() => {
      return api.accounts.getAccounts(BUDGET_ID);
    });
  }

  async getAllCreditCards(): Promise<Account[]> {
    const accounts = await this.cache.get();

    return accounts.data.accounts.filter((account) => {
      return account.type === Account.TypeEnum.CreditCard && !account.closed && !account.deleted;
    });
  }

  async getAccountByTransferPayee(
    transerPayeeId: string,
  ): Promise<Account | undefined> {
    const accounts = await this.cache.get();

    const filtered = accounts.data.accounts.filter((account) => {
      return !account.deleted && !account.closed;
    });

    return filtered.find((a) => {
      return a.transfer_payee_id === transerPayeeId;
    });
  }
}

export default AccountManager;
