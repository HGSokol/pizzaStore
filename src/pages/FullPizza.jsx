import { useEffect, useState } from "react"
import axios from "axios"
import { useParams, Link } from "react-router-dom"

export const FullPizza = () => {
  const [items, setItems] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetch = async() => {
      const {data} = await axios.get(`https://634846130484786c6e965029.mockapi.io/items/${id}`)

      setItems(data)
      console.log(data)
    }
    fetch()

  },[])
  
  if(items) {
    const {price, title, imageUrl, ingredients} = items

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

  return <div> Скелетон </div>
}