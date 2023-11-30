import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
} from '@chakra-ui/react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { CartContext } from '../context/CartContext'
import { CartItem } from './CartItem'

export const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, clearCart } = useContext(CartContext)

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Mi Carrito</DrawerHeader>

        <DrawerBody>
          {!cart.length && <Text>No hay productos en el carrito</Text>}
          {cart.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
        </DrawerBody>

        <DrawerFooter>
          {cart.length > 0 && (
            <>
              <Button
                variant="outline"
                mr={3}
                onClick={clearCart}
                fontSize={{ base: '12px', sm: '16px', md: '16px', lg: '16px' }}
              >
                Vaciar Carrito
              </Button>
              <Button
                bg="#008100"
                color="black"
                _hover={{
                  boxShadow: 'lg',
                  color:'whitesmoke',
                  transition: 'all .4s ease-in-out',
                  bg:'#014F04',
                }}
                fontSize={{ base: '12px', sm: '16px', md: '16px', lg: '16px' }}
                as={Link}
                to="/finalizar-compra"
                onClick={onClose}
              >
                Finalizar Compra
              </Button>
            </>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
