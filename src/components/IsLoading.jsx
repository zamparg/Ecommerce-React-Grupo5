import { Flex, Heading, Spinner } from '@chakra-ui/react'

export const IsLoading = () => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
      h="100vh"
    >
      <Heading color="#008100" size="lg">
        Cargando...
      </Heading>
      <Spinner
        thickness="3px"
        speed="0.65s"
        emptyColor="gray.200"
        color="#008100"
        size="lg"
      />
    </Flex>
  )
}
