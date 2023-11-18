import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { IsLoading } from '../components/IsLoading'
import { ProductCard } from '../components/ProductCard'
import { getAllProducts } from '../services/products'

export const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await getAllProducts()
        setProducts(products.slice(0, 4))
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    getProducts()
  }, [])

  return (
    <Flex flexDirection="column" m={{ base: '10px', md: '30px' }}>
      <Flex
        flexDirection={{ base: 'column', md: 'row' }}
        align="center"
        p={{
          base: '30px 20px',
          sm: '30px 50px 20px 80px',
          md: '40px 20px 40px 120px',
          lg: '40px 90px 40px 160px ',
        }}
        bg="#E8E8E6"
      >
        <Box>
          <Heading
            as="h1"
            fontWeight="normal"
            color="#000000"
            size={{ xl: 'lg', sm: 'lg' }}
          >
            <b>PROYECTO FINAL CaC REACT # Grupo 5</b>, UN ECOMMERCE PARA APRENDER Y APLICAR{' '}
            <b>TECNOLOGIAS WEB.</b>
          </Heading>
          <Button
            as="a"
            href="https://inscripcionesagencia.bue.edu.ar/codoacodo/"
            target="_blank"
            rel="noopener noreferrer"
            colorScheme="blackAlpha"
            variant="outline"
            border="2px"
            borderRadius="50px"
            p={{ base: 2, md: 5 }}
            size={{ base: 'sm', md: 'md' }}
            mt={8}
          >
            VER MAS
          </Button>
        </Box>
        <Image
          width="340px"
          src="/logo6-.svg"
          alt="persona comprando"
        />
      </Flex>
      <Box mt={8}>
        <Heading as="h2" size="lg">
          Los más buscados
        </Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={2}>
          {error && <Text>Ha ocurrido un error</Text>}
          {loading && <IsLoading />}
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {!loading && !products.length && (
            <Text>No se encontraron productos</Text>
          )}
        </SimpleGrid>
      </Box>
    </Flex>
  )
}
