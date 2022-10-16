import { useState } from 'react'

export const Categories = () => {
  const [active, setActive] = useState(0)

  const categories = ['Мясные','Вегетарианская','Гриль','Острые','Закрытые']

  return(
      <div className="categories">
        <ul>
            {
              categories.map((e,i) => (
                  <li
                    key={i}
                    className={active === i ? 'active' : ''}
                    onClick={() => setActive(i)}
                    >
                      {e}
                  </li>
              ))
            }
        </ul>
      </div>
  )
}