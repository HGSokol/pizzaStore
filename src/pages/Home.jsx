import { useState, useEffect, createContext } from 'react'

import { Categories } from '../components/Categories'
import { Sort } from '../components/Sort'
import { Card } from '../components/Card';
import { Skeleton } from '../components/Card/Skeleon';

export const sortContext = createContext()
const {Provider} = sortContext

export const Home = () => {
  const [count, setCount] = useState(0)
  const [item, setItem] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [sort, setSort] = useState('')
  const [category, setCategory] = useState(0)

  useEffect(() => {
    fetch('https://634846130484786c6e965029.mockapi.io/items')
    .then(res => res.json())
    .then(res => {
      setItem(res)
      setIsLoading(false)
    })

    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    fetch(`https://634846130484786c6e965029.mockapi.io/items?sortBy=${sort}${category === 0? '': `&category=${category}`}`)
    .then(res => res.json())
    .then(res => {
      setItem(res)
      setIsLoading(false)
    })
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
              (item.map(e => ( 
                  <Card key={e.id} {...e}/>
              )))
          } 
        </div>
      </div>
    </Provider>
  )
}