import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '../redux/store'
import { selectFilter } from '../redux/slices/filter/selectors' 
import { selectPizzas } from '../redux/slices/pizza/selectors'
import { fetchPizzasItems  } from '../redux/slices/pizza/slice'

import { Categories } from '../components/Categories'
import { Sort } from '../components/Sort'
import { Card } from '../components/Card';
import { Skeleton } from '../components/Card/Skeleon';
import { Pagination } from '../components/Pagination';

const Home =() => {
  const dispatch = useAppDispatch()

  const { value, categoryId, sort, currentPage } = useSelector(selectFilter)
  const { items, isLoading } = useSelector(selectPizzas)

  const fetchPizzas = () => {
    const sortBy = sort.sortCategories.replace('-','');
    const categoryRequest = categoryId === 0? '': `&category=${categoryId}`
    const order = sort.sortCategories.includes('-') ? 'asc' : 'desc'
    const search = value ? `&search=${value}` : ''

    dispatch(
      fetchPizzasItems({
        sortBy, 
        categoryRequest,
        order, 
        search, 
        currentPage: String(currentPage),
      })
    )

    window.scrollTo(0, 0)
  }

  useEffect(() =>{
    fetchPizzas()
  }, [value, sort, categoryId, currentPage])

  return(
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId}/>
        <Sort sort={sort}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {
        isLoading === 'error' ? (
        <div className='content__error-info'>
          <h2>Произошла ошибка</h2>
          <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
        </div>
        ) : (
        <div className="content__items" >
          {
            isLoading === 'loading' ? 
              [...new Array(4)].map( (_, i) => <Skeleton key={i}/> ) :
              (items.map(e => (<Card key={e.id} {...e} />)))
          } 
        </div>
        )
      }
      <Pagination />
    </div>
  )
}

export default Home;