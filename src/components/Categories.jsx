import { useDispatch, useSelector } from 'react-redux'

import { changeCategory } from '../redux/slices/pizzaSlice'

export const Categories = () => {
  const category = useSelector(state => state.pizza.value)
  const dispatch = useDispatch()
  
  const categories = ['Все','Мясные','Вегетарианские','Гриль','Острые','Закрытые']

  return(
    <div className="categories">
      <ul>
        {
          categories.map((e,i) => (
            <li
              key={i}
              className={category === i ? 'active' : ''}
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