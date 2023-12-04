import { onAuthStateChanged, signOut } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'

import { auth } from '../firebase/config'
import { isAdminUser } from '../services/auth'
export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userLoading, setUserLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserLoading(false)
        setUser({
          email: user.email,
          uid: user.uid,
        })
        // Verificar si el usuario es un administrador
        const adminStatus = await isAdminUser(user.email);
        setAdmin(adminStatus);
      } else {
        setUserLoading(false)
      }
      setIsLoading(false)
    })
  }, [])

  const handleLogin = (user) => {
    setUser(user)
  }
  const handleLogout = () => {
    signOut(auth)
    setUser(null)
    setAdmin(false)
  }

  return (
    <UserContext.Provider
      value={{ user, handleLogin, handleLogout, admin, userLoading, isLoading }}
    >
      {children}
    </UserContext.Provider>
  )
}
