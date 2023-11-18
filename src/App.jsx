import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'

import { IsLoading } from './components/IsLoading'
import { ProtegedRoute } from './components/ProtegedRoute'
import { UserContext } from './context/UserContext'
import { AppLayout } from './layouts/AppLayout'
import { AuthLayout } from './layouts/AuthLayout'
import { NotFoundLayout } from './layouts/NotFoundLayout'
import { Account } from './pages/Account'
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import { Checkout } from './pages/Checkout'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Orders } from './pages/Orders'
import { ProductDetails } from './pages/ProductDetails'
import { Products } from './pages/Products'

function App() {
  const { isLoading } = useContext(UserContext)

  if (isLoading) return <IsLoading />

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/productos/:id" element={<ProductDetails />} />
        <Route element={<ProtegedRoute />}>
          <Route path="/finalizar-compra" element={<Checkout />} />
          <Route path="/mi-cuenta" element={<Account />}>
            <Route path="pedidos" element={<Orders />} />
          </Route>
        </Route>
      </Route>
      <Route element={<NotFoundLayout />}>
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/registro" element={<Register />} />
        <Route path="/iniciar-sesion" element={<Login />} />
      </Route>
    </Routes>
  )
}

export default App
