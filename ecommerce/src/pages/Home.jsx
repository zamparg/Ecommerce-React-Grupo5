import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
  Center,
  Container,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";

import { IsLoading } from '../components/IsLoading'
import { ProductCard } from '../components/ProductCard'
import { NewProductCard } from '../components/NewProductCard'

import 'animate.css';

import { getLatestProducts, getMostSearchProducts } from '../services/products'



export const Home = () => {
  // const [products, setProducts] = useState([])
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState(false)

  const [mostSearchProducts, setMostSearchProducts] = useState([]);
  const [loadingMost, setLoadingMost] = useState(true);
  const [errorMost, setErrorMost] = useState(false);
  const [newProducts, setNewProducts] = useState([]);
  const [loadingNew, setLoadingNew] = useState(true);
  const [errorNew, setErrorNew] = useState(false);

  useEffect(() => {
  //   const getProducts = async () => {
  //     try {
  //       const products = await getLatestProducts()
  //       setProducts(products)
  //       console.log('ok')
  //     } catch (error) {
  //       setError(true)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   getProducts()
  // }, [])

  const fetchDataMost = async () => {
    try {
      const mostSearchProducts = await getMostSearchProducts();
      setMostSearchProducts(mostSearchProducts);
      setLoadingMost(false)
    } catch (latestError) {
      setErrorMost(true);
      setLoadingMost(false); // Asegúrate de establecer loadingLatest en false en caso de error
    }
  };

  const fetchDataNew = async () => {
    try {
      
      const newProductsData = await getLatestProducts();
      // Asume que hay una función getNewProducts
      setNewProducts(newProductsData);
      setLoadingNew(false)
    } catch (newError) {
      console.log(newError)
      setErrorNew(true);
      setLoadingNew(false); // Asegúrate de establecer loadingNew en false en caso de error
    }
  };


  fetchDataMost();
  fetchDataNew()
}, []);


  return (
    <>
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
            className='animate__animated animate__fadeInLeft'
            as="h1"
            fontWeight="normal"
            color="#000000"
            size={{ xl: 'lg', sm: 'lg' }}
          >
            <b>PROYECTO FINAL CaC REACT # Grupo 5</b>, UN ECOMMERCE PARA APRENDER Y APLICAR{' '}
            <b>TECNOLOGIAS WEB.</b>
          </Heading>
          <Button
            className='animate__animated animate__fadeInLeft'
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
          className='animate__animated animate__fadeInRight'
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
          {errorMost && <Text>Ha ocurrido un error</Text>}
          {loadingMost && <IsLoading />}
          {mostSearchProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {!loadingMost && !mostSearchProducts.length && (
            <Text>No se encontraron productos</Text>
          )}
        </SimpleGrid>
      </Box>

      <Box mt={8}>
        <Heading as="h2" size="lg">
          Nuevos Ingresos
        </Heading>
        <Center>
         <SimpleGrid columns={{ base: 1, sm: 1, md: 1, lg: 1 }} gap={2}>
          {errorNew && <Text>Ha ocurrido un error</Text>}
          {loadingNew && <IsLoading />}
          {newProducts.map((product) => (
            <NewProductCard key={product.id} product={product} />
          ))}
          {!loadingNew && !newProducts.length && (
            <Text>No se encontraron productos</Text>
          )}
        </SimpleGrid>
        </Center>
      </Box>


    </Flex>
    <Container maxW="2x1" bgColor="#E8E8E8">
        <Flex justifyContent="center">
          <Box textAlign="center" maxW="1000" py="10">
            <Heading className='animate__animated animate__fadeInDown' pb="2">¡TENEMOS UN TICKET DE REGALO PARA VOS!</Heading>
            <Text fontSize="20" pb="4">
              Desde Zeze queremos que tengas una gran oportunidad para comprar
              en nuestra tienda y con la máxima prioridad de transacción.
            </Text>
            <Button
              as={NavLink}
              to="/ticket"
              rel="noopener noreferrer"
              colorScheme="blackAlpha"
              variant="outline"
              border="2px"
              borderRadius="50px"
              p={{ base: 2, md: 5 }}
              size={{ base: "sm", md: "md" }}
            >
              IR AL TICKET
            </Button>
          </Box>
        </Flex>
      </Container>
    </>
  )
}
