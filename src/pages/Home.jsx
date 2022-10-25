import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'

import { Categories } from '../components/Categories'
import { Sort } from '../components/Sort'
import { Card } from '../components/Card';
import { Skeleton } from '../components/Card/Skeleon';
import { Pagination } from '../components/Pagination';
import { objSort } from '../components/Sort'
import { setFilters, selectFilter } from '../redux/slices/filterSlice' 
import { fetchPizzasItems, selectPizzas } from '../redux/slices/pizzasSlice'

export const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearch = useRef(false)

  const { value, categoryId, sort, currentPage } = useSelector(selectFilter)
  const { items, isLoading } = useSelector(selectPizzas)


  console.log(items, isLoading)
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
        currentPage
      })
    )

    window.scrollTo(0, 0)
  }
    
  useEffect(() => {     
    if(window.location.search){
      const params = qs.parse(window.location.search.substring(1));
      const sort = objSort.find(obj => obj.sortCategories === params.sort)
        
      dispatch(setFilters({
        ...params,
        sort
      }));
        isSearch.current = false;
    }
  }, [])
  
  useEffect(() => {
    if(isSearch.current){
      const query = qs.stringify({
        sort: sort.sortCategories,
        categoryId,
        currentPage,
      })
      navigate(`?${query}`)  

      fetchPizzas()
    }
    
    if (!window.location.search) {
      console.log(1)
      fetchPizzas();
    }
    isSearch.current = true
  }, [value, sort, categoryId, currentPage])
  

  console.log(items)
  return(
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {
        isLoading === 'error' ? (
        <div className='content__error-info'>
          <h2>Произошла ошибка</h2>
          <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
        </div>
        ) : (
        <div className="content__items">
          {
            isLoading === 'loading' ? [...new Array(4)].map( (_, i) => <Skeleton key={i}/> ) :
              (items
                  .map(e => ( 
                  <Card key={e.id} {...e}/>
              )))
          } 
        </div>
        )
      }
      <Pagination />
    </div>
  )
}