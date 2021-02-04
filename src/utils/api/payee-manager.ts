import ynab, { PayeesResponse } from 'ynab';
import Cache from '../cache';

export default class PayeeManager {
  api: ynab.API;
  budgetId: string;
  private cache: Cache<PayeesResponse>;
  private payeeCache: PayeesResponse | null = null;
  private payeePromise: Promise<PayeesResponse> | null = null;

  constructor(api: ynab.API, budgetId: string) {
    this.api = api;
    this.cache = new Cache<PayeesResponse>(() => {
      return this.api.payees.getPayees(this.budgetId);
    });
    this.budgetId = budgetId;
  }

  async getTransferPayee(accountId: string): Promise<string> {
    const payees = await this.cache.get();

    const payee = payees.data.payees
      .filter((payee) => {
        return !payee.deleted;
      })
      .find((payee) => {
        return payee.transfer_account_id === accountId;
      });

    if (payee) {
      return payee.id;
    }
    throw new Error(`Could not find transfer payee for account ${accountId}`);
  }
}
