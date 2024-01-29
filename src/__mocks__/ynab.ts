import {
  CategoriesResponse,
  PayeesResponse,
  Payee,
  MonthDetailResponse,
  AccountsResponse,
  Account,
} from 'ynab';
const ynab = {
  Account, // Make some types available in the test
  utils: {
    getCurrentDateInISOFormat: () => '2020-03-21',
  },
  transactions: {},
  API: class {
    accounts = {
      getAccounts: jest.fn(
        async (): Promise<AccountsResponse> => {
          const accounts: Account[] = [
            {
              id: 'id-test-transfer',
              name: 'Test Account',
              on_budget: true,
              closed: false,
              balance: 2503543,
              uncleared_balance: 353,
              cleared_balance: 35,
              transfer_payee_id: 'existing-transfer-id',
              type: Account.TypeEnum.Checking,
              deleted: false,
            },
            {
              id: 'id-closed',
              name: 'Test Account',
              on_budget: true,
              closed: true,
              balance: 2503543,
              uncleared_balance: 353,
              cleared_balance: 35,
              transfer_payee_id: 'closed-transfer-id',
              type: Account.TypeEnum.Checking,
              deleted: false,
            },
            {
              id: 'id-deleted',
              name: 'Test Account',
              on_budget: true,
              closed: false,
              balance: 2503543,
              uncleared_balance: 353,
              cleared_balance: 35,
              transfer_payee_id: 'deleted-transfer-id',
              type: Account.TypeEnum.Checking,
              deleted: true,
            },
            {
              id: 'id-offbudget',
              name: 'Test Account',
              on_budget: false,
              closed: false,
              balance: 2503543,
              uncleared_balance: 353,
              cleared_balance: 35,
              transfer_payee_id: 'gm-retirement-transfer-id',
              type: Account.TypeEnum.Checking,
              deleted: false,
            },
            {
              id: 'credit-card-id',
              name: 'Credit Card',
              on_budget: true,
              closed: false,
              balance: 2503540,
              uncleared_balance: 3503,
              cleared_balance: 3533,
              transfer_payee_id: 'credit-card-transfer-id',
              type: Account.TypeEnum.CreditCard,
              deleted: false,
            },
            {
              id: 'credit-card-other-id',
              name: 'Another Credit Card',
              on_budget: true,
              closed: false,
              balance: 2583520,
              uncleared_balance: 3503,
              cleared_balance: 3533,
              transfer_payee_id: 'another-credit-card-transfer-id',
              type: Account.TypeEnum.CreditCard,
              deleted: false,
            },
          ];

          return {
            data: {
              accounts,
              server_knowledge: 353453,
            },
          };
        },
      ),
    };
    categories = {
      updateMonthCategory: jest.fn(() => Promise.resolve()),
      getCategories: jest.fn(
        (budget_id: string): Promise<CategoriesResponse> => {
          budget_id; // to shut the linter up
          const response: CategoriesResponse = {
            data: {
              category_groups: [
                {
                  id: 'INTERNAL-MASTER',
                  name: 'Internal Master Category',
                  hidden: false,
                  deleted: false,
                  categories: [
                    {
                      id: 'INFLOW-CATEGORY',
                      category_group_id: 'INTERNAL-MASTER',
                      name: 'Inflow: Ready to Assign',
                      budgeted: 0,
                      activity: 335,
                      balance: 353,
                      hidden: false,
                      deleted: false,
                    },
                  ],
                },
                {
                  id: 'OTHER-CATEGORY-GROUP',
                  name: 'Other categories',
                  hidden: false,
                  deleted: false,
                  categories: [
                    {
                      id: 'hsa',
                      name: 'HSA Contributions',
                      category_group_id: 'OTHER-CATEGORY-GROUP',
                      budgeted: 0,
                      activity: 335,
                      balance: 353,
                      hidden: false,
                      deleted: false,
                    },
                    {
                      id: 'health',
                      name: 'Health Coverage',
                      category_group_id: 'OTHER-CATEGORY-GROUP',
                      budgeted: 0,
                      activity: 335,
                      balance: 353,
                      hidden: false,
                      deleted: false,
                    },
                    {
                      id: 'lfsa',
                      name: 'LFSA Contributions',
                      category_group_id: 'OTHER-CATEGORY-GROUP',
                      budgeted: 0,
                      activity: 335,
                      balance: 353,
                      hidden: false,
                      deleted: false,
                    },
                    {
                      id: 'taxes',
                      name: 'Taxes',
                      category_group_id: 'OTHER-CATEGORY-GROUP',
                      budgeted: 0,
                      activity: 335,
                      balance: 353,
                      hidden: false,
                      deleted: false,
                    },
                    {
                      id: 'shared-budget-contribution',
                      name: 'Joint budget',
                      category_group_id: 'OTHER-CATEGORY-GROUP',
                      budgeted: 0,
                      activity: 335,
                      balance: 353,
                      hidden: false,
                      deleted: false,
                    },
                    {
                      id: '401k',
                      name: '401(k) contributions',
                      category_group_id: 'OTHER-CATEGORY-GROUP',
                      budgeted: 0,
                      activity: 335,
                      balance: 353,
                      hidden: false,
                      deleted: false,
                    },
                    {
                      id: '401k',
                      name: '401(k) contributions',
                      category_group_id: 'OTHER-CATEGORY-GROUP',
                      budgeted: 0,
                      activity: 335,
                      balance: 353,
                      hidden: false,
                      deleted: false,
                    },
                  ],
                },
              ],
              server_knowledge: 0,
            },
          };
          return Promise.resolve(response);
        },
      ),
    };
    months = {
      getBudgetMonth: jest.fn(
        (
          budget_id: string,
          month: string | Date,
        ): Promise<MonthDetailResponse> => {
          // to shut the linter up
          budget_id;
          month;

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
                ],
              },
            },
          };

          return Promise.resolve(response);
        },
      ),
    };
    transactions = {
      createTransactions: jest.fn(),
    };
    payees = {
      getPayees: jest.fn(
        (): Promise<PayeesResponse> => {
          const payees: Payee[] = [
            {
              id: 'venmo-transfer-id',
              name: 'Transfer : Venmo',
              transfer_account_id: 'venmo-account-id',
              deleted: false,
            },
            {
              id: 'rbfcu-checking-transfer-id',
              name: 'Transfer: RBFCU Checking',
              transfer_account_id: 'fake-rbfcu-checking-account',
              deleted: false,
            },
            {
              id: 'gm-retirement-transfer-id',
              name: 'Transfer: RBFCU Checking',
              transfer_account_id: 'fake-gm-retirement-account',
              deleted: false,
            },
            {
              id: 'hsa-transfer-id',
              name: 'Transfer: HSA Cash',
              transfer_account_id: 'fake-hsa-account',
              deleted: false,
            },
            {
              id: 'nyc-food-week-id',
              name: 'NYC Food week',
              transfer_account_id: null,
              deleted: false,
            },
          ];

          return Promise.resolve({
            data: {
              payees,
              server_knowledge: 54,
            },
          });
        },
      ),
    };
  },
};

module.exports = ynab;
