import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { UserContext } from '../context/UserContext'

export const ProtegedRoute = () => {
  const { user } = useContext(UserContext)

  if (!user) {
    return <Navigate to="/iniciar-sesion" replace />
  }
  return <Outlet />
}
