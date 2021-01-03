import { api, loadTransactions, postTransactions } from "./api";
import { BUDGET_ID } from '../constants'
import PayeeManger from './payee-manager'
import AccountManager from "./account-manager";
import CategoryManger from './category-manager'

const payeeManager = new PayeeManger(api, BUDGET_ID )
const accountManager = new AccountManager();
const categoryManager = new CategoryManger(api, BUDGET_ID);

export {
  api,
  loadTransactions,
  postTransactions,
  payeeManager,
  accountManager,
  categoryManager,
}