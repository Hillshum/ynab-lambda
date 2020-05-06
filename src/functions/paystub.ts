import { APIGatewayProxyResult } from "aws-lambda";
import { parsePaystub, TransactionType } from "../parse-paystub";
import * as ynab from "ynab";

import { api } from '../utils/api';


import { WITHHOLDINGS_ID, BUDGET_ID } from "../utils/constants";

type Direction = 'inflow' | 'outflow';

interface TransactionDetails {
  name: TransactionType
  payee: string
  direction: Direction
  categoryName?: string
  memo: string
}

const directionMultipliers = {
  inflow: 1,
  outflow: -1,
}



const transactionRows: TransactionDetails[] = [
  {
    name: 'gross',
    payee: 'General Motors',
    // categoryName: 'Inflow: To'
    direction: 'inflow',
    memo: 'Gross Pay',
  },

  {
    name: 'taxes',
    payee: 'Internal Revenue Service',
    direction: 'outflow',
    memo: 'All deducted taxes',
  },
  {
    name: 'hsa',
    payee: 'HSA',
    direction: 'outflow',
    memo: 'Regular deduction',
  },
  {
    name: 'health',
    payee: 'Aetna',
    direction: 'outflow',
    memo: 'Health premium',
  },
]

export const paystubHandler = async (stub: string): Promise<APIGatewayProxyResult> => {

  const amounts = parsePaystub(stub);

  const newTransactions: ynab.SaveTransaction[] = transactionRows.map(transaction => {
    return {
      amount: amounts[transaction.name] * 1000 * directionMultipliers[transaction.direction],
      account_id: WITHHOLDINGS_ID,
      date: ynab.utils.getCurrentDateInISOFormat(),
      memo: transaction.memo,

    }
  })



  await api.transactions.createTransactions(BUDGET_ID, {transactions: newTransactions});
  return {
    statusCode: 200,
    body: 'success',
  }
}

export default paystubHandler;