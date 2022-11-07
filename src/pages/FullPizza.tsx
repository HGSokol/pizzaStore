import React, { useState, useEffect } from "react"
import axios from "axios"
import { useParams, Link, useNavigate } from "react-router-dom"

import { Pizza } from "../redux/slices/pizza/types"

const FullPizza = () => {
  const [itemPizza, setItemPizza] = useState<Pizza | null>(null)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if(id){
      const fetch = async () => {
        try{
          const { data } = await axios.get(`https://634846130484786c6e965029.mockapi.io/items/${id}`)
          setItemPizza(data)
        } catch(e){
          alert('Ошибка получения пицц!')
          navigate('/')
        }
      }
      
      fetch()
    }
  },[])
  
  if(!itemPizza) {
    return <div>Загрузка...</div>
  }

  const { price, title, imageUrl, ingredients } = itemPizza
  return (
    <div className='container'>
      <div className='singlePizza'>
        <img src={imageUrl} alt="Pizza"/>
        <div className='singlePizza__title'>
          <h2>{title}</h2>
          <p>{ingredients}</p>
          <div className="pizza-block__bottom">
            <div className="pizza-block__price">{`от ${price} ₽`}</div>
          </div>
          <Link to='/'>
            <button 
              className="button button--black">
              <span>
                Вернуться назад
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FullPizza;