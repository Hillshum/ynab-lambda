import { APIGatewayProxyResult } from "aws-lambda";
import { parsePaystub, TransactionType } from "../parse-paystub";
import * as ynab from "ynab";

import { api, payeeManager, categoryManager, accountManager } from '../utils/api';


import { BUDGET_ID, RBFCU_CHECKING_ID, GM_RETIREMENT_ACCOUNT_ID } from "../utils/constants";

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
    categoryName: 'Inflows',
    direction: 'inflow',
    memo: 'Gross Pay',
  },

  {
    name: 'taxes',
    payeeName: 'Internal Revenue Service',
    direction: 'outflow',
    categoryName: 'Taxes',
    memo: 'All deducted taxes',
  },
  {
    name: 'hsa',
    payeeName: 'HSA',
    direction: 'outflow',
    categoryName: 'HSA Contributions',
    memo: 'Regular deduction',
  },
  {
    name: 'health',
    payeeName: 'Aetna',
    categoryName: 'Health Coverage',
    direction: 'outflow',
    memo: 'Health premium',
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
      categoryName: '401(k) contributions',
      memo: '401(k) contribution',
    },
    calculate: (amounts) => amounts.retirement * -2
  },
  {
    details: {
      name: 'retirement_total',
      payeeTransferId: GM_RETIREMENT_ACCOUNT_ID,
      direction: 'outflow',
      categoryName: '401(k) contributions',
      memo: 'Retirement savings',
    },
    calculate: (amounts) => amounts.retirement * 3
  }
]


export const paystubHandler = async (stub: string): Promise<APIGatewayProxyResult> => {

  try {

    const transactionsToAdjust: ynab.SaveSubTransaction[] = [];

    const amounts = parsePaystub(stub);

    const newTransactions: ynab.SaveSubTransaction[] = await Promise.all(transactionRows.map(async transaction => {
      const preparedTransaction: ynab.SaveSubTransaction = {
        amount: Math.round(amounts[transaction.name] * 1000),
        memo: transaction.memo,
      }

      if (transaction.categoryName) {
        preparedTransaction.category_id = await categoryManager.getCategoryIdByName(transaction.categoryName)
      }

      if (isTransfer(transaction)) {
        preparedTransaction.payee_id = await payeeManager.getTransferPayee(transaction.payeeTransferId)

        const account = await accountManager.getAccountByTransferPayee(transaction.payeeTransferId);
        if (account && !account.on_budget) {
          transactionsToAdjust.push(preparedTransaction)
        }

      }

      if (isNamedPayee(transaction)) {
        preparedTransaction.payee_name = transaction.payeeName;
        
        if (transaction.direction === 'outflow') {
          transactionsToAdjust.push(preparedTransaction);
        }
      }

      return preparedTransaction;

    }))

    const calculated: ynab.SaveSubTransaction[] = await Promise.all(calculatedTransactions.map(async (transaction) => {
      const preparedTransaction: ynab.SaveSubTransaction = {
        amount: Math.round(transaction.calculate(amounts) * 1000),
        memo: transaction.details.memo,

      }

      if (transaction.details.categoryName) {
        preparedTransaction.category_id = await categoryManager.getCategoryIdByName(transaction.details.categoryName)
      }

      if (isTransfer(transaction.details)) {
        preparedTransaction.payee_id = await payeeManager.getTransferPayee(transaction.details.payeeTransferId)

        const account = await accountManager.getAccountByTransferPayee(preparedTransaction.payee_id);
        if (account && !account.on_budget) {
          transactionsToAdjust.push(preparedTransaction)
        }
      }

      if (isNamedPayee(transaction.details)) {
        preparedTransaction.payee_name = transaction.details.payeeName;
        
        if (transaction.details.direction === 'outflow') {
          transactionsToAdjust.push(preparedTransaction);
        }
      }

      return preparedTransaction;
    }))

    const parentTransaction: ynab.SaveTransaction = {
      payee_name: 'General Motors',
      memo: 'Net paycheck',
      amount: Math.round(amounts.net * 1000),
      date: ynab.utils.getCurrentDateInISOFormat(),
      account_id: RBFCU_CHECKING_ID,
      subtransactions: [...newTransactions, ...calculated],
    }

    // const transactionsToCreate = [...newTransactions, ...calculated];

    console.log(`about to create new transactions ${JSON.stringify(parentTransaction)}`)
    await api.transactions.createTransactions(BUDGET_ID, {transaction: parentTransaction });



    console.log(`about to adjust categories ${transactionsToAdjust}`)
    // await adjustCategories(transactionsToAdjust);



    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: 'success',
    }
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: 'error'
    }
  }
}

export default paystubHandler;