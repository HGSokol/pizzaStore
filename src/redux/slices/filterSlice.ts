import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../store'

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

const initialState: FilterSliceState = {
  value: '',
  categoryId: 0,
  sort: {
      name: 'популярности (Возрастанию)',
      sortCategories: SortPropertyEnum.RATING_DESC,
  },
  currentPage: 1,
}

export const filterSlice = createSlice({
  name:'filter',
  initialState,
  reducers:{
    inputSort: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
    changeCategory: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload
    },
    sortPizza: (state, action: PayloadAction<SortArr>) => {
      state.sort = action.payload
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setFilters: (state, action: PayloadAction<FilterSliceState>) => {
      state.sort = action.payload.sort
      state.categoryId = Number(action.payload.categoryId)
      state.currentPage = Number(action.payload.currentPage)
    }
  },
})

export const selectFilter = (state: RootState) => state.filterReducer

const {actions, reducer} = filterSlice

export const {inputSort, changeCategory, sortPizza, changePage, setFilters} = actions
export default reducer