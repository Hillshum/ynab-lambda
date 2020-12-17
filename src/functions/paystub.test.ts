import { mocked } from "ts-jest/utils";

import { parsePaystub } from "../parse-paystub";

import { BUDGET_ID } from "../utils/constants";

jest.mock('../parse-paystub');

const mockedParse = mocked(parsePaystub);

mockedParse.mockImplementation(()=> {
  return {
    gross: 515,
    taxes: 35.335,
    hsa: 34.35,
    health: 893,
    retirement: 122.76,
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

 const transactionsToUpload: SaveTransaction[] = [
  {
    amount: 515000,
    account_id: 'fake-withholdings-account',
    date: '2020-03-21',
    memo: 'Gross Pay',
    payee_name: 'General Motors',

  },
  {
    amount: -35335,
    account_id: 'fake-withholdings-account',
    memo: 'All deducted taxes',
    date: '2020-03-21',
    payee_name: 'Internal Revenue Service',
  },
  {
    amount: -34350,
    account_id: 'fake-withholdings-account',
    date: '2020-03-21',
    memo: 'Regular deduction',
    payee_name: 'HSA',
  },
  {
    amount: -893000,
    account_id: 'fake-withholdings-account',
    memo: 'Health premium',
    date: '2020-03-21',
    payee_name: 'Aetna'
  },
  {
    amount: -83000,
    account_id: 'fake-withholdings-account',
    payee_id: 'rbfcu-checking-transfer-id',
    date: '2020-03-21',
    memo: 'Net paycheck'
    
  },
  {
    amount: 245520,
    payee_name: 'General Motors',
    date: '2020-03-21',
    account_id: 'fake-withholdings-account',
    memo: '401(k) contribution'
  },
  {
    amount: -368280,
    payee_id: 'gm-retirement-transfer-id',
    date: '2020-03-21',
    account_id: 'fake-withholdings-account',
    memo: 'Retirement savings'
  }
]

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
    BUDGET_ID, {transactions: transactionsToUpload});
})


test('calculates the correct transactions that need adjustments', async () => {

  await paystubHandler(stub);

  expect(mockedAdjust).toHaveBeenCalledTimes(1);
  expect(mockedAdjust.mock.calls[0][0]).toHaveLength(4);

})