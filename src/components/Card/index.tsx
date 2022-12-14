import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { selectCart } from '../../redux/slices/cart/selectors'
import { addItem } from '../../redux/slices/cart/slice'
import { CartItem } from '../../redux/slices/cart/types'
import { Pizza } from '../../redux/slices/pizza/types'
import { useAppDispatch } from '../../redux/store'

export const Card = (props: Pizza) => {
  const dispatch = useAppDispatch()
  const { id, price, sizes, imageUrl, title, types } = props
  const { items } = useSelector(selectCart)
  const addedCount = items.find(e => e.id === id) 
  
  const [activeType, setActiveType] = useState(0)
  const [activeSize, setActiveSize] = useState(0)
  
  const arr = ['Традиционное', 'Тонкое'].filter((_,i) => types.includes(i))
  
  const onClickAdd = () => {
    const itemObj: CartItem = {
      id,
      price, 
      title, 
      types: arr[activeType],
      sizes: String(sizes[activeSize]), 
      imageUrl, 
      count: 0,
    }
    
    dispatch(addItem(itemObj))
  }

  const count = !addedCount? 0 : addedCount.count

  return (
    <div 
      className='pizza-block'>
      <div className="pizza-block-wrapper" >
        <Link to={`/pizza/${id}`}>
          <img
            className="pizza-block__image"
            src={imageUrl}
            alt="Pizza"
          />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {
              arr.map((item,i) => (
                <li 
                key={i} 
                className={activeType === i ?  'active' : ''}
                onClick={() => setActiveType(i)}>{item}</li>
              ))
            }
          </ul>
          <ul>
            {
              sizes.map((item,i) => (
                <li 
                key={i} 
                className={activeSize === i ? 'active' : ''}
                onClick={ () => setActiveSize(i)}>{item}</li>
              ))
            }
          </ul>
        </div> 
          <div className="pizza-block__bottom">
            <div className="pizza-block__price">{`от ${price} ₽`}</div>
            <button 
              className="button button--outline button--add"
              onClick={onClickAdd}>
              <svg
              width={12}
              height={12}
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                  fill="white"
                />
              </svg>
              <span>
                Добавить
              </span>
              {
                count > 0 && (
                  <i>{count}</i>
                )
              }
            </button>
        </div>
      </div>
    </div>
  )
}