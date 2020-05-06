import { APIGatewayProxyResult } from "aws-lambda";
import { parsePaystub, TransactionType } from "../parse-paystub";
import * as ynab from "ynab";

import { api, payeeManager } from '../utils/api';


import { WITHHOLDINGS_ID, BUDGET_ID, RBFCU_CHECKING_ID, GM_RETIREMENT_ACCOUNT_ID } from "../utils/constants";

type Direction = 'inflow' | 'outflow';

interface TransactionDetailsRaw {
  name: TransactionType
  direction: Direction
  categoryName?: string
  memo: string
}

interface TransactionTransfer extends TransactionDetailsRaw {
  payeeTransferId: string,
}

interface TransactionNamedPayee extends TransactionDetailsRaw {
  payeeName: string
}

type TransactionDetails = TransactionTransfer | TransactionNamedPayee
const directionMultipliers = {
  inflow: 1,
  outflow: -1,
}

const isNamedPayee = (t: TransactionDetails): t is TransactionNamedPayee => (
  (t as TransactionNamedPayee).payeeName !== undefined
)

const isTransfer = (t: TransactionDetails) : t is TransactionTransfer => {
 return (t as TransactionTransfer).payeeTransferId !== undefined; 
}


const transactionRows: TransactionDetails[] = [
  {
    name: 'gross',
    payeeName: 'General Motors',
    // categoryName: 'Inflow: To'
    direction: 'inflow',
    memo: 'Gross Pay',
  },

  {
    name: 'taxes',
    payeeName: 'Internal Revenue Service',
    direction: 'outflow',
    memo: 'All deducted taxes',
  },
  {
    name: 'hsa',
    payeeName: 'HSA',
    direction: 'outflow',
    memo: 'Regular deduction',
  },
  {
    name: 'health',
    payeeName: 'Aetna',
    direction: 'outflow',
    memo: 'Health premium',
  },
  {
    name: 'net',
    payeeTransferId: RBFCU_CHECKING_ID,
    direction: 'outflow',
    memo: 'Net paycheck',
  },
]

interface CalculatedTransaction {
  details: TransactionDetails
  calculate: (amounts: Record<TransactionType, number>) => number
}

const calculatedTransactions: CalculatedTransaction[] = [
  {
    details: {
      name: 'retirement_gm',
      payeeName: 'General Motors',
      direction: 'inflow',
      memo: '401(k) contribution',
    },
    calculate: (amounts) => amounts.retirement * 2
  },
  {
    details: {
      name: 'retirement_total',
      payeeTransferId: GM_RETIREMENT_ACCOUNT_ID,
      direction: 'outflow',
      memo: 'Retirement savings',
    },
    calculate: (amounts) => amounts.retirement * 3
  }
]


export const paystubHandler = async (stub: string): Promise<APIGatewayProxyResult> => {

  const amounts = parsePaystub(stub);

  const newTransactions: ynab.SaveTransaction[] = await Promise.all(transactionRows.map(async transaction => {
    const preparedTransaction: ynab.SaveTransaction = {
      amount: amounts[transaction.name] * 1000 * directionMultipliers[transaction.direction],
      account_id: WITHHOLDINGS_ID,
      date: ynab.utils.getCurrentDateInISOFormat(),
      memo: transaction.memo,

    }
    if (isTransfer(transaction)) {
      preparedTransaction.payee_id = await payeeManager.getTransferPayee(transaction.payeeTransferId)
    }

    if (isNamedPayee(transaction)) {
      preparedTransaction.payee_name = transaction.payeeName;
    }

    return preparedTransaction;

  }))

  const calculated: ynab.SaveTransaction[] = await Promise.all(calculatedTransactions.map(async (transaction) => {
    const preparedTransaction: ynab.SaveTransaction = {
      amount: transaction.calculate(amounts) * 1000 * directionMultipliers[transaction.details.direction],
      account_id: WITHHOLDINGS_ID,
      date: ynab.utils.getCurrentDateInISOFormat(),
      memo: transaction.details.memo,

    }
    if (isTransfer(transaction.details)) {
      preparedTransaction.payee_id = await payeeManager.getTransferPayee(transaction.details.payeeTransferId)
    }

    if (isNamedPayee(transaction.details)) {
      preparedTransaction.payee_name = transaction.details.payeeName;
    }

    return preparedTransaction;
  }))


  

  await api.transactions.createTransactions(BUDGET_ID, {transactions: [...newTransactions, ...calculated]});
  return {
    statusCode: 200,
    body: 'success',
  }
}

export default paystubHandler;