import { HStack, Text } from '@chakra-ui/react'
export const Footer = () => {
  return (
    <HStack
      h={200}
      bg="#111111"
      flexDirection="column"
      justifyContent="center"
      gap={4}
      textAlign="center"
    >

      <Text color="#7E7E7E">Proyecto final © 2023 CaC Comisión 23644</Text>
      <Text color="#7E7E7E">
        Desarrollado con ❤️ Grupo 5
      </Text>
    </HStack>
  )
}
