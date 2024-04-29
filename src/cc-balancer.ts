import { Account } from "ynab"
import { api, categoryManager } from "./utils/api"
import { BUDGET_ID } from "./utils/constants"
import { getStartOfMonth } from "./utils/date"


const checkCreditCardForUnderfunding = async (account: Account) => {


    const threashold = getStartOfMonth();

    const res = await api.transactions.getTransactionsByAccount(BUDGET_ID, account.id, threashold);
    
    const transfers = res.data.transactions.filter(t => t.transfer_account_id && t.amount > 0);

    // sum the transfers
    const sum = transfers.reduce((acc, t) => acc + t.amount, 0);

    const paymentCategory = await categoryManager.getCCPaymentCategoryByCC(account.name)
    return {
        sum,
        assigned: paymentCategory.budgeted,
        
    }
}

