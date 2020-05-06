
const ynab = {
  utils: {
    getCurrentDateInISOFormat: () => '2020-03-21'
  },
  transactions: {},
  API: class {
    transactions = {
      createTransactions: jest.fn(),
    }
  }
}

module.exports = ynab