import * as ynab from 'ynab';
import { SaveTransactionsResponse, TransactionDetail } from 'ynab';

import { ACCESS_TOKEN, BUDGET_ID } from '../constants';
import { Transaction } from '../csv';

export const api = new ynab.API(ACCESS_TOKEN);

export const loadTransactions = async (
  accountId: string,
): Promise<TransactionDetail[]> => {
  const response = await api.transactions.getTransactionsByAccount(
    BUDGET_ID,
    accountId,
  );
  return response.data.transactions;
};

export const postTransactions = (
  transactions: Transaction[],
  accountId: string,
): Promise<SaveTransactionsResponse> => {
  const formateted: ynab.SaveTransaction[] = transactions.map((t) => ({
    date: t.Date,
    amount: t.Amount * 1000,
    cleared: ynab.SaveTransaction.ClearedEnum.Cleared,
    payee_name: t.Payee,
    memo: t.Memo,
    account_id: accountId,
    import_id: t.ImportId,
  }));

  return api.transactions.createTransaction(BUDGET_ID, {
    transactions: formateted,
  });
};
