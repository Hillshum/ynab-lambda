import { PayeesResponse, Payee, MonthDetailResponse } from "ynab";
import { BUDGET_ID } from "../utils/constants";
const ynab = {
  utils: {
    getCurrentDateInISOFormat: () => '2020-03-21'
  },
  transactions: {},
  API: class {
    categories = {
      updateMonthCategory: jest.fn(()=>Promise.resolve()),
    }
    months = {
      getBudgetMonth: jest.fn( 
        (BudgetId: string, month: string | Date): Promise<MonthDetailResponse> => {
          const response: MonthDetailResponse = {
            data: {
              month: {
                month: '2020-04-01',
                income: 0,
                budgeted: 343,
                activity: 0,
                to_be_budgeted: 354,
                age_of_money: 353,
                deleted: false,
                categories: [
                  {
                    id: '1',
                    category_group_id: '10',
                    name: 'Fake Retirement',
                    hidden: false,
                    budgeted: 50000,
                    activity: 500,
                    balance: 1000,
                    deleted: false,
                  },
                  {
                    id: '2',
                    category_group_id: '10',
                    name: 'Fake Taxes',
                    hidden: false,
                    budgeted: 50000,
                    activity: 500,
                    balance: 1000,
                    deleted: false,
                  },
                  {
                    id: '3',
                    category_group_id: '10',
                    name: 'Fake HSA',
                    hidden: false,
                    budgeted: 50000,
                    activity: 500,
                    balance: 1000,
                    deleted: false,
                  },
                  {
                    id: '4',
                    category_group_id: '10',
                    name: 'Fake Premiums',
                    hidden: false,
                    budgeted: -50000,
                    activity: 500,
                    balance: 1000,
                    deleted: false,
                  },
                ]
              }
            }
          }

          return Promise.resolve(response);
      })
    }
    transactions = {
      createTransactions: jest.fn(),
    }
    payees = {
      getPayees: jest.fn((): Promise<PayeesResponse>=> {
            const payees: Payee[] =[
            {
              "id": "venmo-transfer-id",
              "name": "Transfer : Venmo",
              "transfer_account_id": "venmo-account-id",
              "deleted": false
            },
            {
              id: 'rbfcu-checking-transfer-id',
              name: 'Transfer: RBFCU Checking',
              transfer_account_id: 'fake-rbfcu-checking-account',
              deleted: false
            },
            {
              id: 'gm-retirement-transfer-id',
              name: 'Transfer: RBFCU Checking',
              transfer_account_id: 'fake-gm-retirement-account',
              deleted: false
            },
            {
              "id": "nyc-food-week-id",
              "name": "NYC Food week",
              "transfer_account_id": null,
              "deleted": false
            },
          ]

        return Promise.resolve({
          data: {
            payees,
            server_knowledge: 54,
          }
        });
      })
    }
  }
}

module.exports = ynab