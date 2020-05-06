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
    retirement: 1.2,
    net: 83
  }
});

import { api } from '../utils/api/api';

jest.mock('../utils/api/api.ts');



const mockedApi = mocked(api, false);


import paystubHandler from './paystub';


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
-$94.07
 EE Benefits Post-Tax Deductions$0.00
 Employee Deductions$0.00
 Net Pay$2,010.37
 Employer Contributions$0.00

 `

 const transactionsToUpload = [
  {
    amount: 515000,
    account_id: 'fake-withholdings-account',
    date: '2020-03-21',
    memo: 'Gross Pay',

  },
  {
    amount: -35335,
    account_id: 'fake-withholdings-account',
    memo: 'All deducted taxes',
    date: '2020-03-21',
  },
  {
    amount: -34350,
    account_id: 'fake-withholdings-account',
    date: '2020-03-21',
    memo: 'Regular deduction',
  },
  {
    amount: -893000,
    account_id: 'fake-withholdings-account',
    memo: 'Health premium',
    date: '2020-03-21',
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