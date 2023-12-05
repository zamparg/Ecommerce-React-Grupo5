import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Spinner,
  Stack,
  StackDivider,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from "../context/UserContext";
import { NavLink } from "react-router-dom";
import { CartContext } from '../context/CartContext'
import { getProductById } from '../services/products'

export const ProductDetails = () => {
  const { id } = useParams()
  const { addProduct } = useContext(CartContext)

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const { admin } = useContext(UserContext);

  const toast = useToast()

  useEffect(() => {
    const getData = async () => {
      try {
        const productData = await getProductById(id)
        setProduct(productData)
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [id])

  const addProductToCart = () => {
    addProduct({
      ...product,
      quantity,
    })
    toast({
      title: 'Producto agregado',
      status: 'success',
      colorScheme: 'blackAlpha',
      duration: 2500,
      isClosable: false,
    })
  }

  return (
   <Container maxW="5xl">
      {loading ? (
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <Spinner
            thickness="3px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#008100"
            size="lg"
          />
        </Flex>
      ) : error ? (
        <Text textAlign="center">
          Error al cargar los detalles del producto
        </Text>
      ) : (
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
        >
          <Flex>
            <Image
              src={product?.image}
              alt={product?.name}
              borderRadius="lg"
              fit="cover"
              w="100%"
              h={{ base: '100%', lg: '500px' }}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as="header">
              <Heading
                fontWeight="normal"
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
              >
                {product?.name}
              </Heading>
              <Text fontWeight={300} fontSize="2xl">
                ${product?.price}
              </Text>
            </Box>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction="column"
              divider={<StackDivider borderColor="gray.300" />}
            >
              <Text
                fontSize={{ base: 'xl', sm: '2xl', md: '2xl', lg: '2xl' }}
                fontWeight={300}
              >
                {product?.description}
              </Text>
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color="#008100"
                  fontWeight={500}
                  textTransform="uppercase"
                  mb={4}
                >
                  Categoria
                </Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <Text spacing={2}>{product?.category}</Text>
                </SimpleGrid>
              </Box>
            </Stack>
            <Flex>
              <NumberInput
                defaultValue={1}
                min={1}
                max={product.stock}
                size="lg"
                maxW="100px"
                mr="2rem"
                onChange={(value) => setQuantity(Number(value))}
              >
                <NumberInputField py={6} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {admin ? ( <Button
                 as={NavLink} 
                 to={`/editar-producto/${id}`} 
                w="full"
                size="lg"
                py={6}
                bg="black"
                color="white"
                textTransform="uppercase"
                _hover={{
                  transform: 'translateY(2px)',
                  boxShadow: 'lg',
                  color:"#008100",
                  transition: 'all .3s ease-in-out',
                }}
                
                fontSize={{ base: '11px', sm: '18px', md: '18px', lg: '18px' }}
                
              >
                Editar Producto
              </Button>) :  <Button
                w="full"
                size="lg"
                py={6}
                bg="black"
                color="white"
                textTransform="uppercase"
                _hover={{
                  transform: 'translateY(2px)',
                  boxShadow: 'lg',
                  color:"#008100",
                  transition: 'all .3s ease-in-out',
                }}
                onClick={addProductToCart}
                fontSize={{ base: '11px', sm: '18px', md: '18px', lg: '18px' }}
              >
                Agregar al Carrito
              </Button>}

             
            </Flex>
          </Stack>
        </SimpleGrid>
      )}
    </Container>
  )
}
