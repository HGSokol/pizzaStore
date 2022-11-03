export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

export type SortArr = {
  name: string,
  sortCategories: SortPropertyEnum,
}

export interface FilterSliceState {
  value:string,
  categoryId: number,
  sort: SortArr,
  currentPage: number,
}