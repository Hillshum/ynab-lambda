import { api, loadTransactions, postTransactions } from "./api";
import { BUDGET_ID } from '../constants'
import PayeeManger from './payee-manager'

const payeeManager = new PayeeManger(api, BUDGET_ID )

export {
  api,
  loadTransactions,
  postTransactions,
  payeeManager,
}