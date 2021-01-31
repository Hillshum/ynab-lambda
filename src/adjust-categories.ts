import * as ynab from 'ynab';

import { BUDGET_ID } from "./utils/constants";

import { api } from "./utils/api";

const adjustCategories = async (transactions: ynab.SaveTransaction[]):
    Promise<undefined> => {
  const month = 'current' // TODO: fix that for timezone and rollover
  const {data: {month: {categories: currentCategories }}} = await api.months.getBudgetMonth(BUDGET_ID, month) 


  await Promise.all(transactions.map( async transaction => {

    if (! transaction.category_id) {
      console.warn(`Missing categoryId on ${transaction}`);
      return;
    }

    const category = currentCategories.find(({id}) => id === transaction.category_id);

    if (!category) {
      console.warn(`Unable to find category for ${transaction}`);
      return;
    }

    const adjustedBalance = category.budgeted - transaction.amount;


    await api.categories.updateMonthCategory(
      BUDGET_ID,
      month,
      transaction.category_id,
      {category: {
        budgeted: adjustedBalance,
      }})

  }))

  return;

}

export default adjustCategories;