import { useState, useEffect } from 'react'

import { Categories } from '../components/Categories'
import { Sort } from '../components/Sort'
import { Card } from '../components/Card';
import { Skeleton } from '../components/Card/Skeleon';

export const Home = () => {
  const [count, setCount] = useState(0)
  const [item, setItem] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('https://634846130484786c6e965029.mockapi.io/items')
    .then(res => res.json())
    .then(res => {
      setItem(res)
      setIsLoading(false)
    })

  }, [])

  const onClickAdd = () => {
    setCount(prev => prev + 1)
  }

  return(
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoading ? [...new Array(10)].map( (_, i) => <Skeleton key={i}/> ) :
            (item.map(e => ( 
                <Card 
                  key={e.id} 
                  onClickAdd={onClickAdd} 
                  count={count} 
                  {...e}/>
            )))
        } 
      </div>
    </>
  )
}