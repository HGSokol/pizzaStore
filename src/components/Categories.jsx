import { useContext } from 'react'
import { sortContext } from '../pages/Home'

export const Categories = () => {
  const {setCategory, category} = useContext(sortContext)
  
  const categories = ['Все','Мясные','Вегетарианская','Гриль','Острые','Закрытые']

  return(
    <div className="categories">
      <ul>
          {
            categories.map((e,i) => (
              <li
                key={i}
                className={category === i ? 'active' : ''}
                onClick={() => setCategory(i)}
              >
                {e}
              </li>
            ))
          }
      </ul>
    </div>
  )
}