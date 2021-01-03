import ynab, { CategoriesResponse } from 'ynab'
import Cache from '../cache';


export default class CategoryManager {
  api: ynab.API
  budgetId: string
  private cache: Cache<CategoriesResponse>

  constructor(api: ynab.API, budgetId: string) {
    this.api = api;
    this.cache = new Cache<CategoriesResponse>(() => {
      return this.api.categories.getCategories(this.budgetId);
    })
    this.budgetId = budgetId;
  }
  

  async getCategoryIdByName(categoryName: string) {
    const response = await this.cache.get();

    const categories = response.data.category_groups.flatMap(group => group.categories)

    const category = categories.find(c => c.name === categoryName);

    if (! category) {
      throw new Error(`Unable to find category ${categoryName}`)
    }

    return category.id;

  }

}
