import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

import { Categories } from '../components/Categories'
import { Sort } from '../components/Sort'
import { Card } from '../components/Card';
import { Skeleton } from '../components/Card/Skeleon';
import { Pagination } from '../components/Pagination';


export const Home = () => {
  const { value, categoryId, sort, currentPage } = useSelector(state => state.filterReducer)

  const [item, setItem] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    const sortBy = sort.sortCategories.replace('-','');
    const categoryRequest = categoryId === 0? '': `&category=${categoryId}`
    const order = sort.sortCategories.includes('-') ? 'asc' : 'desc'
    const search = value ? `&search=${value}` : ''

    axios
      .get(`https://634846130484786c6e965029.mockapi.io/items?page=${currentPage+1}&limit=4&sortBy=${sortBy}${categoryRequest}&order=${order}&${search}`)
      .then(res => {
        setItem(res.data)
        setIsLoading(false)
      })
      .catch(e => {
        alert("Ошибка получения пицц", e.message)
      }) 
      
    window.scrollTo(0, 0)
  }, [value, sort, categoryId, currentPage])

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
                  .map(e => ( 
                  <Card key={e.id} {...e}/>
              )))
          } 
        </div>
        <Pagination />
      </div>
  )
}