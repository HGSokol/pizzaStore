import React from 'react'
import { useSelector } from 'react-redux'

import { changeCategory } from '../redux/slices/filterSlice'
import { selectFilter } from '../redux/slices/filterSlice'
import { useAppDispatch } from '../redux/store'

const categories = ['Все','Мясные','Вегетарианские','Гриль','Острые','Закрытые']

export const Categories = () => {
  const { categoryId } = useSelector(selectFilter)
  const dispatch = useAppDispatch()

  return(
    <div className="categories">
      <ul>
        {
          categories.map((item,i) => (
            <li
              key={i}
              className={categoryId === i ? 'active' : ''}
              onClick={() => dispatch(changeCategory(i))}>
              {item}
            </li>
          ))
        }
      </ul>
    </div>
  )
}