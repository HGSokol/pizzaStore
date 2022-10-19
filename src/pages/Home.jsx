import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Categories } from '../components/Categories'
import { Sort } from '../components/Sort'
import { Card } from '../components/Card';
import { Skeleton } from '../components/Card/Skeleon';
import { Pagination } from '../components/Pagination';


export const Home = () => {
  const filterPizza = useSelector(state => state.filter.value)
  const changeCategory = useSelector(state => state.pizza.value)
  const sort = useSelector(state => state.pizza.sort)
  const currentPage = useSelector(state => state.pizza.currentPage)

  const [item, setItem] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    const sortBy = sort.sortCategories.replace('-','');
    const categoryRequest = changeCategory === 0? '': `&category=${changeCategory}`
    const order = sort.sortCategories.includes('-') ? 'asc' : 'desc'

    fetch(
      `https://634846130484786c6e965029.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${sortBy}${categoryRequest}&order=${order}`
    )
      .then(res => res.json())
      .then(res => {
        setItem(res)
        setIsLoading(false)
      })

    window.scrollTo(0, 0)
  }, [sort, changeCategory, currentPage])

  return(
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {
            isLoading ? [...new Array(4)].map( (_, i) => <Skeleton key={i}/> ) :
              (item
                  .filter(e => e.title.toLowerCase().includes(filterPizza.toLowerCase()))
                  .map(e => ( 
                  <Card key={e.id} {...e}/>
              )))
          } 
        </div>
        <Pagination />
      </div>
  )
}