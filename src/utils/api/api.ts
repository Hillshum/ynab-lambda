import * as ynab from 'ynab';

import { ACCESS_TOKEN, BUDGET_ID } from '../constants'
import { Transaction } from '../csv';


export const api = new ynab.API(ACCESS_TOKEN)

export const loadTransactions = async (accountId: string) => {
  const response = await api.transactions.getTransactionsByAccount(BUDGET_ID, accountId);
  return response.data.transactions;

}

export const postTransactions = (transactions: Transaction[], accountId: string) => {
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

export const getTransferPayee = async (accountId: string) => {
  const payees = await api.payees.getPayees(BUDGET_ID);

  return payees.data.payees.filter(payee => {
    return !payee.deleted;
  }).find(payee => {
    return payee.transfer_account_id === accountId;
  })?.id;
}