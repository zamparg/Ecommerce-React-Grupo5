import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Badge,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Show,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext } from "react";
import { BsBagHeart } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { CartDrawer } from "./CartDrawer";
/*header*/
export const Header = () => {
  const { user, handleLogout } = useContext(UserContext);
  const { admin } = useContext(UserContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cart } = useContext(CartContext);

  return (
    <HStack justifyContent="space-between" p={4} px={8}>
      <Show below="md">
        <Menu>
          <MenuButton as={IconButton} icon={<HamburgerIcon size={15} />} />
          <Portal>
            <MenuList>
              <MenuItem as={NavLink} to="/">
                INICIO
              </MenuItem>
              <MenuItem as={NavLink} to="/productos">
                PRODUCTOS
              </MenuItem>
              <MenuItem as={NavLink} to="/ticket">
                TICKET
              </MenuItem>
              <MenuItem as={NavLink} to="/contacto">
                CONTACTO
              </MenuItem>
              {admin ? (
                <MenuItem as={NavLink} to="/nuevo-producto">
                  NUEVO PRODUCTO
                </MenuItem>
              ) : null}
              {!user ? (
                <>
                  <MenuItem as={NavLink} to="/iniciar-sesion">
                    Iniciar Sesión
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem as={NavLink} to="/mi-cuenta/pedidos">
                    Mis Pedidos
                  </MenuItem>
                  <MenuItem onClick={() => handleLogout()}>
                    Cerrar Sesión
                  </MenuItem>
                </>
              )}
            </MenuList>
          </Portal>
        </Menu>
      </Show>
      <Heading
        color="#BE3969"
        fontSize={{ base: "18px", sm: "24px", md: "36px", lg: "36px" }}
        as={NavLink}
        to="/"
      >
        <Image
          src="/logo6-.png"
          boxSize={{ base: "40px", sm: "60px", md: "80px", lg: "80px" }}
        />
      </Heading>
      <HStack gap={6}>
        <Show above="md">
          <HStack as="nav" gap={6}>
            <Link
              as={NavLink}
              fontWeight="semibold"
              to="/"
              _hover={{ color: "#008100" }}
            >
              INICIO
            </Link>
            <Link
              as={NavLink}
              fontWeight="semibold"
              to="/productos"
              _hover={{ color: "#008100" }}
            >
              PRODUCTOS
            </Link>
            <Link
              as={NavLink}
              fontWeight="semibold"
              to="/ticket"
              _hover={{ color: "#008100" }}
            >
              TICKET
            </Link>
            <Link
              as={NavLink}
              fontWeight="semibold"
              to="/contacto"
              _hover={{ color: "#008100" }}
            >
              CONTACTO
            </Link>

            {admin ? (
              <Link
                as={NavLink}
                fontWeight="semibold"
                to="/nuevo-producto"
                _hover={{ color: "#008100" }}
              >
                NUEVO PRODUCTO
              </Link>
            ) : null}
          </HStack>
        </Show>
        <HStack gap={6}>
          <Show above="md">
            {!user ? (
              <Button>
                <Link
                  as={NavLink}
                  to="/iniciar-sesion"
                  _hover={{ color: "#008100" }}
                >
                  Iniciar Sesión
                </Link>
              </Button>
            ) : (
              <Menu>
                <MenuButton as={Button}>
                  <FaUserAlt size={15} />
                </MenuButton>
                <Portal>
                  <MenuList>
                    <MenuItem as={NavLink} to="/mi-cuenta/pedidos">
                      Mis Pedidos
                    </MenuItem>
                    <MenuItem onClick={() => handleLogout()}>
                      Cerrar Sesión
                    </MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
            )}
          </Show>
          <IconButton
            _hover={{ color: "#008100" }}
            icon={<BsBagHeart size={20} />}
            onClick={onOpen}
          />
          {cart.length > 0 && (
            <Badge
              position="absolute"
              top={{ md: 5, base: 3 }}
              right={5}
              borderRadius="full"
              color="white"
              bg="#008100"
              w="25px"
              h="25px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {cart.length}
            </Badge>
          )}
        </HStack>
      </HStack>
      <CartDrawer isOpen={isOpen} onClose={onClose} />
    </HStack>
  );
};
