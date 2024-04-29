import ynab, { CategoriesResponse } from 'ynab';
import Cache from '../cache';

export default class CategoryManager {
  api: ynab.API;
  budgetId: string;
  private cache: Cache<CategoriesResponse>;

  constructor(api: ynab.API, budgetId: string) {
    this.api = api;
    this.cache = new Cache<CategoriesResponse>(() => {
      return this.api.categories.getCategories(this.budgetId);
    });
    this.budgetId = budgetId;
  }

  async getCCPaymentCategoryByCC(creditCardName: string) {
    const response = await this.cache.get();

    const ccGroup = response.data.category_groups.find(
      (group) => group.name === 'Credit Card Payments',
    );
    const category = ccGroup?.categories.find((category) => {
      return category.name.includes(creditCardName);
    })
    if (!category) {
      throw new Error(`Unable to find category for credit card ${creditCardName}`);
    }
    return category;
  }
  async getCategoryIdByName(categoryName: string): Promise<string> {
    const response = await this.cache.get();

    const categories = response.data.category_groups.flatMap(
      (group) => group.categories,
    );

    const category = categories.find((c) => c.name === categoryName);

    if (!category) {
      throw new Error(`Unable to find category ${categoryName}`);
    }

    return category.id;
  }
}
