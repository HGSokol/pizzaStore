import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home'
import { MainLayout } from './layouts/MainLayout';
import './scss/app.scss'; 

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'))
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'))
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'))
 
function App() {
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='' element={<Home />}/>
          <Route path='cart' element={<Cart />}/>
          <Route path='pizza/:id' element={<FullPizza />}/>
          <Route path='*' element={<NotFound />}/>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
