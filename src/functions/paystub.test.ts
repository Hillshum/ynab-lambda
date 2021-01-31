import { mocked } from "ts-jest/utils";

import { parsePaystub } from "../parse-paystub";

import { BUDGET_ID, RBFCU_CHECKING_ID } from "../utils/constants";

jest.mock('../parse-paystub');

const mockedParse = mocked(parsePaystub);

mockedParse.mockImplementation(()=> {
  return {
    gross: 515,
    taxes: -35.335,
    hsa: -34.35,
    health: -893,
    retirement: -122.76,
    net: 83,
    retirement_gm: 0,
    retirement_total: 0,
    
  }
});

import { api } from '../utils/api/api';
import adjustCategories from '../adjust-categories'

jest.mock('../utils/api/api.ts');


jest.mock('../adjust-categories');

const mockedAdjust = mocked(adjustCategories);

const mockedApi = mocked(api, false);


import paystubHandler from './paystub';
import { SaveTransaction } from "ynab";
import { categoryManager } from "../utils/api";


const stub = `
 Gross Pay$2,351.80
 Earnings$2,351.80
 EE Taxes-$221.91
 EE Benefits Pre-tax Deductions-$119.52
*HEALTH SAVINGS ACCT
-$8.95
*HEALTH CARE
-$16.50
*RSP PRE-TAX BASIC
-$122.76
 EE Benefits Post-Tax Deductions$0.00
 Employee Deductions$0.00
 Net Pay$2,010.37
 Employer Contributions$0.00

 `

 const transactionsToUpload: SaveTransaction = {

  account_id: RBFCU_CHECKING_ID,
  date: '2020-03-21', 
  amount: 83000,
  memo: 'Net paycheck',
  payee_name: 'General Motors',
  subtransactions:  [
    {
      amount: 515000,
      memo: 'Gross Pay',
      payee_name: 'General Motors',
      category_id: 'INFLOW-CATEGORY',

    },
    {
      amount: -35335,
      memo: 'All deducted taxes',
      category_id: 'taxes',
      payee_name: 'Internal Revenue Service',
    },
    {
      amount: -34350,
      memo: 'Regular deduction',
      category_id: 'hsa',
      payee_name: 'HSA',
    },
    {
      amount: -893000,
      memo: 'Health premium',
      payee_name: 'Aetna',
      category_id: 'health',
    },
    {
      amount: 245520,
      payee_name: 'General Motors',
      memo: '401(k) contribution',
      category_id: '401k',
    },
    {
      amount: -368280,
      payee_id: 'gm-retirement-transfer-id',
      memo: 'Retirement savings',
      category_id: '401k',
    }
  ]
}

 beforeEach(() => {
   jest.clearAllMocks();
 })


test('it calls parse once with the stub', async () => {
  
  await paystubHandler(stub);

  expect(mockedParse).toHaveBeenCalledWith(stub);
  expect(mockedParse).toHaveBeenCalledTimes(1);

})

test('it sends the correct transactions to ynab', async () => {

  await paystubHandler(stub);

  expect(mockedApi.transactions.createTransactions).toHaveBeenCalledTimes(1);


  expect(mockedApi.transactions.createTransactions).toHaveBeenCalledWith(
    BUDGET_ID, {transaction: transactionsToUpload});
})


xtest('calculates the correct transactions that need adjustments', async () => {

  await paystubHandler(stub);

  expect(mockedAdjust).toHaveBeenCalledTimes(1);
  expect(mockedAdjust.mock.calls[0][0]).toHaveLength(4);

})