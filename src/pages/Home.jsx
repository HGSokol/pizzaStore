import { useState, useEffect, createContext, useContext } from 'react'

import { inputContext } from '../App';
import { Categories } from '../components/Categories'
import { Sort } from '../components/Sort'
import { Card } from '../components/Card';
import { Skeleton } from '../components/Card/Skeleon';
import { Pagination } from '../components/Pagination';

export const sortContext = createContext()
const {Provider} = sortContext

export const Home = () => {
  const {searchValue} = useContext(inputContext)
  const [count, setCount] = useState(0)
  const [item, setItem] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [sort, setSort] = useState({
    name:'популярности (Возрастанию)',
    sortCategories:'rating',
  })
  const [category, setCategory] = useState(0)

  useEffect(() => {
    setIsLoading(true)

    const sortBy = sort.sortCategories.replace('-','');
    const categoryRequest = category === 0? '': `&category=${category}`
    const order = sort.sortCategories.includes('-') ? 'asc' : 'desc'

    fetch(
      `https://634846130484786c6e965029.mockapi.io/items?sortBy=${sortBy}${categoryRequest}&order=${order}`
    )
      .then(res => res.json())
      .then(res => {
        setItem(res)
        setIsLoading(false)
      })

    window.scrollTo(0, 0)
  }, [sort, category])

  return(
    <Provider value={{
      setSort,
      sort,
      setCategory,
      category,
      setCount,
      count,
    }}>
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {
            isLoading ? [...new Array(10)].map( (_, i) => <Skeleton key={i}/> ) :
              (item
                  .filter(e => e.title.toLowerCase().includes(searchValue.toLowerCase()))
                  .map(e => ( 
                  <Card key={e.id} {...e}/>
              )))
          } 
        </div>
        <Pagination />
      </div>
    </Provider>
  )
}