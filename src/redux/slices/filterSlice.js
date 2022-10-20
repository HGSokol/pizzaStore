import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value:'',
  categoryId: 0,
  sort: {
      name:'популярности (Возрастанию)',
      sortCategories:'rating',
  },
  currentPage: 0,
}

export const filterSlice = createSlice({
  name:'filter',
  initialState,
  reducers:{
    inputSort: (state, action) => {
      state.value = action.payload
    },
    changeCategory: (state,action) => {
      state.categoryId = action.payload
    },
    sortPizza: (state, action) => {
      state.sort = action.payload
    },
    changePage: (state,action) => {
      state.currentPage = action.payload
    },
  },
})

const {actions, reducer} = filterSlice

export default reducer
export const {inputSort, changeCategory, sortPizza, changePage} = actions