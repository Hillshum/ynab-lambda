import { API, SaveMonthCategory, SaveMonthCategoryWrapper, SaveTransaction } from 'ynab';
import adjustCategories from './adjust-categories';


import { mocked } from 'ts-jest/utils';

import { api } from "./utils/api";
import { BUDGET_ID } from './utils/constants';

const apiMock = mocked(api, true);

interface TestSaveTransaction extends SaveTransaction {
  expectedAmount: number;
}

const transactions: TestSaveTransaction[] = [
  {
    amount: -20,
    account_id: 'fake-withholdings-account',
    memo: 'All deducted taxes',
    date: '2020-03-21',
    category_id: '2',
    payee_name: 'Internal Revenue Service',
    expectedAmount: 50020,
  },
  {
    amount: -30,
    account_id: 'fake-withholdings-account',
    date: '2020-03-21',
    memo: 'Regular deduction',
    payee_name: 'HSA',
    category_id: '3',
    expectedAmount: 50030,
  },
  {
    amount: -25,
    account_id: 'fake-withholdings-account',
    memo: 'Health premium',
    date: '2020-03-21',
    payee_name: 'Aetna',
    category_id: '4',
    expectedAmount: -49975,
  },
  {
    amount: -31,
    payee_id: 'gm-retirement-transfer-id',
    date: '2020-03-21',
    account_id: 'fake-withholdings-account',
    memo: 'Retirement savings',
    category_id: '1',
    expectedAmount: 50031,
  }
]


test('should fetch categories exactly once', async ()=> {

  await adjustCategories(transactions);

  expect(apiMock.months.getBudgetMonth).toBeCalledTimes(1);

})

test('should update categories with correct amounts', async () => {

  await adjustCategories(transactions);

  const expectedCalls: Parameters<API['categories']['updateMonthCategory']>[] = transactions.map(t => {
    return [
      BUDGET_ID, 
      'current',
      t.category_id || '',
      {
        category: {
          budgeted: t.expectedAmount,
        }
      }

    ]

  })
  expect(apiMock.categories.updateMonthCategory).toBeCalledTimes(transactions.length);
  expect(apiMock.categories.updateMonthCategory.mock.calls).toEqual(expectedCalls);

})