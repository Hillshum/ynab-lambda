import ynab, { PayeesResponse } from 'ynab'

export default class PayeeManager {
  api: ynab.API
  budgetId: string
  private payeeCache: PayeesResponse | null = null;
  private payeePromise: Promise<PayeesResponse> | null = null;

  constructor(api: ynab.API, budgetId: string) {
    this.api = api;
    this.budgetId = budgetId;
  }

  async getCached() : Promise<PayeesResponse>{
    if (this.payeeCache) {
      return this.payeeCache
    }

    if (this.payeePromise) {
      return this.payeePromise;
    }
    
   this.payeePromise = this.api.payees.getPayees(this.budgetId);

   return this.payeePromise;
  }

  async getTransferPayee(accountId: string){
  const payees = await this.getCached();

  const payee = payees.data.payees.filter(payee => {
    return !payee.deleted;
  }).find(payee => {
    return payee.transfer_account_id === accountId;
  });

  if (payee) {
    return payee.id;
  }
  throw new Error(`Could not find transfer payee for account ${accountId}`)
  }
}