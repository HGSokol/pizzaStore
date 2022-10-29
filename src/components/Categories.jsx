import { useDispatch, useSelector } from 'react-redux'

import { changeCategory } from '../redux/slices/filterSlice'
import { selectFilter } from '../redux/slices/filterSlice'

const categories = ['Все','Мясные','Вегетарианские','Гриль','Острые','Закрытые']

export const Categories = () => {
  const { categoryId } = useSelector(selectFilter)
  const dispatch = useDispatch()

  return(
    <div className="categories">
      <ul>
        {
          categories.map((e,i) => (
            <li
              key={i}
              className={categoryId === i ? 'active' : ''}
              onClick={() => dispatch(changeCategory(i))}
            >
              {e}
            </li>
          ))
        }
      </ul>
    </div>
  )
}