import { Flex, Stack } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Stack as="main" flex="1">
        <Outlet />
      </Stack>
    </Flex>
  )
}
