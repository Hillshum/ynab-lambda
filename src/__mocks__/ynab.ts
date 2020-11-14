import { PayeesResponse, Payee } from "ynab";
const ynab = {
  utils: {
    getCurrentDateInISOFormat: () => '2020-03-21'
  },
  transactions: {},
  API: class {
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