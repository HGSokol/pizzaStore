import React, { useState, useRef, useEffect, memo } from 'react'

import { SortArr, SortPropertyEnum } from '../redux/slices/filter/types'
import { sortPizza } from '../redux/slices/filter/slice'
import { useAppDispatch } from '../redux/store'

type PopupClick = MouseEvent & {
  path: Node[]
}

export const objSort: SortArr[] = [
  {name:'популярности (Возрастанию)', sortCategories: SortPropertyEnum.RATING_DESC},
  {name:'популярности (Убыванию)', sortCategories: SortPropertyEnum.RATING_ASC},
  {name:'цене (Возрастанию)', sortCategories: SortPropertyEnum.PRICE_DESC},
  {name:'цене (Убыванию)', sortCategories: SortPropertyEnum.PRICE_ASC},
  {name:'алфавиту (Возрастанию)', sortCategories: SortPropertyEnum.TITLE_DESC},
  {name:'алфавиту (Убыванию)', sortCategories: SortPropertyEnum.TITLE_ASC},
]

export const Sort = memo(({sort}:{sort:SortArr}) => {
  const dispatch = useAppDispatch()
  const [openPopup, setOpenPopup] = useState(false)
  const sortRef = useRef<HTMLDivElement | null>(null)

  const isSort = (item: SortArr) => {
    dispatch(sortPizza(item))
    setOpenPopup(false)
  }

  useEffect(() => { 
    const handleClickOutside = (e: MouseEvent) => {
      const _event = e as PopupClick
      if(sortRef.current && !_event.path.includes(sortRef.current)){
          setOpenPopup(false)
      }
    }

    document.body.addEventListener('click', handleClickOutside)
    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])
  
  return(
    <div 
      ref={sortRef}
      className="sort">
      <div className="sort__label">
        <svg 
          width={10}
          height={6}
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span   
          onClick={() => setOpenPopup(prev => !prev)}>
            {sort.name}
        </span>
      </div>
      {openPopup && (
        <div className="sort__popup">
          <ul>
            {
              objSort.map((item,i) => (
                <li 
                  key={i}
                  className={sort.sortCategories === item.sortCategories ? 'active' : '' }
                  onClick={() => isSort(item)}
                >
                  {item.name}
                </li>
              ))
            }
          </ul>
        </div>
      )}
    </div>
  )
})