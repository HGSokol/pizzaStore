import React, { memo } from 'react'

import { changeCategory } from '../redux/slices/filter/slice'
import { useAppDispatch } from '../redux/store'

const categories = ['Все','Мясные','Вегетарианские','Гриль','Острые','Закрытые']

export const Categories = memo(({categoryId}:{categoryId:number}) => {
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
})