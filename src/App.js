import { useState } from 'react'

import { Header } from './components/Header';
import { Categories } from './components/Categories'
import { Sort } from './components/Sort'
import { Card } from './components/Card';

import DB from './assets/db.json'
import './scss/app.scss';


function App() {
  const [count, setCount] = useState(0)
  const [cost, setCost] = useState([])

  const onClickAdd = () => {
    setCount(prev => prev + 1)
  }

  const costCard = (price) => {
    setCost(prev => [...prev, price])
  }

  return (
    <div className="wrapper">
      <Header 
        count={count} cost={cost}/>
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              DB.map(e => {
                return <Card 
                          key={e.id} 
                          costCard={costCard} 
                          onClickAdd={onClickAdd} 
                          count={count} 
                          {...e}/>
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
