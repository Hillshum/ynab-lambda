import * as ynab from 'ynab';
import { Transaction } from './csv';

const ACCOUNT_ID = process.env.ACCOUNT_ID || '';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN || '';
const BUDGET_ID = process.env.BUDGET_ID || '';

const api = new ynab.API(ACCESS_TOKEN)

const loadTransactions = async () => {
  const response = await api.transactions.getTransactionsByAccount(BUDGET_ID, ACCOUNT_ID);
  return response.data.transactions;

}

const postTransactions = (transactions: Transaction[]) => {
  const formateted: ynab.SaveTransaction[] = transactions.map(t=> ({
    date: t.Date,
    amount: t.Amount * 1000,
    cleared: ynab.SaveTransaction.ClearedEnum.Cleared,
    payee_name: t.Payee,
    memo: t.Memo,
    account_id: ACCOUNT_ID,
    import_id: t.ImportId,
  }))

  return api.transactions.createTransaction(BUDGET_ID, {transactions: formateted});
}

export { loadTransactions, postTransactions}