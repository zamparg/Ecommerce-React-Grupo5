import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'

import { CartItem } from '../components/CartItem'
import { IsLoading } from '../components/IsLoading'
import { UserContext } from '../context/UserContext'
import { getOrderByUserId } from '../services/products'

export const Orders = () => {
  const { user } = useContext(UserContext)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const loadUserOrders = async () => {
      try {
        const data = await getOrderByUserId(user.uid)
        setOrders(data)
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    loadUserOrders()
  }, [user.uid])

  if (loading) {
    return <IsLoading />
  }

  return (
    <Stack p={4} gap={4} w="100%">
      <Heading as="h2" size="lg" fontWeight="normal">
        Mis pedidos
      </Heading>
      {error && <Text>Ha ocurrido un error</Text>}
      {loading && <IsLoading />}
      {orders && (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4}>
          {orders.map((order) => (
            <Box key={order.id} order={order}>
              <Card maxW="md">
                <CardHeader>
                  <Heading size="md">ID de la orden: </Heading>
                  <Text pt="2" fontSize="sm">
                    {order.id}
                  </Text>
                </CardHeader>

                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4">
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Nombre: {order.name}
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        Email: {order.email}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Dirección: {order.address}
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        Provincia: {order.province}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Total: $ {order.total}
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        Estado de pago:{' '}
                        {order.paid ? 'Pagado' : 'Pendiente de pago'}
                      </Text>
                    </Box>
                  </Stack>
                </CardBody>
                <CardFooter>
                  <Button
                    bg="#BE3969"
                    color="white"
                    _hover={{
                      boxShadow: 'lg',
                    }}
                    onClick={() => {
                      setOrder(order)
                      onOpen()
                    }}
                  >
                    Ver Detalles
                  </Button>
                </CardFooter>
              </Card>
            </Box>
          ))}
        </SimpleGrid>
      )}
      {!loading && !orders.length && <Text>No tenes órdenes pendientes</Text>}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalle del Pedido</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {order &&
              order.cart.map((item) => (
                <CartItem key={item.id} product={item} hideButton={true} />
              ))}
          </ModalBody>

          <ModalFooter>
            <Box w="100%">
              <Button w="full" bg="gray" color="white" mr={3} onClick={onClose}>
                CERRAR
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  )
}
