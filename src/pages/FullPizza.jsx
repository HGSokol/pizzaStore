import { useEffect, useState } from "react"
import axios from "axios"
import { useParams, Link, useNavigate } from "react-router-dom"

export const FullPizza = () => {
  const [item, setItem] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetch = async () => {
      try{
        const { data } = await axios.get(`https://634846130484786c6e965029.mockapi.io/items/${id}`)
        setItem(data)
      } catch(e){
        alert('Ошибка получения пицц!')
        navigate('/')
      }
    }

    fetch()
  },[])
  
  if(!item) {
    return <div>Загрузка...</div>
  }

  const {price, title, imageUrl, ingredients} = item
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