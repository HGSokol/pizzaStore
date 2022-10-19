import { useState, createContext } from 'react'
import { Route, Routes } from 'react-router-dom';

import { Header } from './components/Header';
import { Home } from './pages/Home'
import { Cart } from './pages/Cart'
import { NotFound } from './pages/NotFound'

import './scss/app.scss'; 

export const inputContext = createContext()
const { Provider } = inputContext

function App() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="wrapper">
      <Provider value={{
        searchValue,
        setSearchValue,
      }}>
        <Header />
        <div className="content">
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/cart' element={<Cart />}/>
              <Route path='*' element={<NotFound />}/>
            </Routes>
        </div>
      </Provider>
    </div>
  );
}

export default App;
