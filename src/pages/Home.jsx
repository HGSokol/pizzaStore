import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'

import { Categories } from '../components/Categories'
import { Sort } from '../components/Sort'
import { Card } from '../components/Card';
import { Skeleton } from '../components/Card/Skeleon';
import { Pagination } from '../components/Pagination';
import { setFilters } from '../redux/slices/filterSlice' 
import { objSort } from '../components/Sort'

export const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearch = useRef(false)

  const { value, categoryId, sort, currentPage } = useSelector(state => state.filterReducer)

  const [item, setItem] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchPizzas = () => {
    setIsLoading(true)

    const sortBy = sort.sortCategories.replace('-','');
    const categoryRequest = categoryId === 0? '': `&category=${categoryId}`
    const order = sort.sortCategories.includes('-') ? 'asc' : 'desc'
    const search = value ? `&search=${value}` : ''

    axios
      .get(`https://634846130484786c6e965029.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${sortBy}${categoryRequest}&order=${order}&${search}`)
      .then(res => {
        setItem(res.data)
        setIsLoading(false)
      })
      .catch(e => {
        alert("Ошибка получения пицц", e.message)
      })
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
      fetchPizzas();
    }
    isSearch.current = true
  }, [value, sort.sortCategories, categoryId, currentPage])
  
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