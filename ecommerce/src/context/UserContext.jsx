import { onAuthStateChanged, signOut } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'

import { auth } from '../firebase/config'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userLoading, setUserLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoading(false)
        setUser({
          email: user.email,
          uid: user.uid,
        })
        // const uid = user.uid
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
  }

  return (
    <UserContext.Provider
      value={{ user, handleLogin, handleLogout, userLoading, isLoading }}
    >
      {children}
    </UserContext.Provider>
  )
}
