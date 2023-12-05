
/*Productos*/
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
  Flex,
  Spacer,
} from '@chakra-ui/react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { CartContext } from '../context/CartContext'

export const NewProductCard = ({ product }) => {
  const { image, name, price, id } = product
  const { addProduct } = useContext(CartContext)
  const toast = useToast()

  const addProductToCart = (product, quantity) => {
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
    <Card size = 'lg' maxW="500px">
      <CardBody>
        <Link to={'/productos/' + id}>
          <Image src={image} alt={name} borderRadius="lg" width="100%" height="200px" objectFit='cover'/>
        </Link>

          <Flex width="100%" mt="6" alignItems='center'>
          <Heading size="md" fontWeight={400}>
            {name}
          </Heading>
          <Spacer />
          <Text fontWeight={300} fontSize="2xl">
            ${price}
          </Text>
          </Flex>

      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup
          gap={2}
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
        >
          <Button
            as={Link}
            to={'/productos/' + id}
            variant="solid"
            bg="black"
            color="white"
            textTransform="uppercase"
            _hover={{
              transform: 'translateY(1px)',
              boxShadow: 'lg',
              color:'#008100',
              transition: 'all .3s ease-in-out',
            }}
          >
            Ver Detalles
          </Button>
          <Button
            variant="ghost"
            color="#008100"
            onClick={() => addProductToCart(product, 1)}
            _hover={{
              transition: 'all .3s ease-in-out',
              backgroundColor: 'gray.300',
            }}
          >
            Agregar al carrito
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}
