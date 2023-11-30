import { Heading, Text, VStack } from '@chakra-ui/react'
import { useContext } from 'react'
import { Outlet } from 'react-router-dom'

import { UserContext } from '../context/UserContext'

export const Account = () => {
  const { user } = useContext(UserContext)
  return (
    <VStack justifyContent="center">
      <Heading as="h2" size="lg" fontWeight="normal">
        Mi cuenta
      </Heading>
      <Text>{user.email}</Text>
      <Outlet />
    </VStack>
  )
}
