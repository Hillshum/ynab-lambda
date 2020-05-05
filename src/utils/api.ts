import * as ynab from 'ynab';

import { ACCESS_TOKEN, BUDGET_ID } from './constants'
import { Transaction } from './csv';


const api = new ynab.API(ACCESS_TOKEN)

const loadTransactions = async (accountId: string) => {
  const response = await api.transactions.getTransactionsByAccount(BUDGET_ID, accountId);
  return response.data.transactions;

}

const postTransactions = (transactions: Transaction[], accountId: string) => {
  const formateted: ynab.SaveTransaction[] = transactions.map(t=> ({
    date: t.Date,
    amount: t.Amount * 1000,
    cleared: ynab.SaveTransaction.ClearedEnum.Cleared,
    payee_name: t.Payee,
    memo: t.Memo,
    account_id: accountId,
    import_id: t.ImportId,
  }))

  return api.transactions.createTransaction(BUDGET_ID, {transactions: formateted});
}

export { loadTransactions, postTransactions}