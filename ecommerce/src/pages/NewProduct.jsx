import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Select,
  Textarea,
  Input,
  SimpleGrid,
  Stack,
  Flex,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {  createProduct } from '../services/products'


export const NewProduct = () => {
 
  const { register, handleSubmit, reset, formState } = useForm()

  const { errors, isDirty } = formState

  const toast = useToast()

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
 

  const onSubmitProduct = async (data) => {
    setLoading(true)
    try {
      await createProduct({
        name: data.name,
        category:data.category,
        image: data.image, 
        isNew: true,
        price: data.price,
        description: data.description,
        searchCounter:0
      })
      reset();
      toast({
        title: 'Tu Producto fue creado con éxito',
        status: 'success',
        colorScheme: 'pink',
        duration: 2500,
      })
    
    } catch (error) {
      console.log(error)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Flex flexWrap="wrap" justifyContent="center" >
    <SimpleGrid p={{ base: '0', md: '24px' }} width={{ base: '75%', md: '40%' }}>
      <Heading as="h2" size="lg" fontWeight="normal" pl={6}>
        Nuevo Producto
      </Heading>
      <SimpleGrid p={6} gap={6} columns={{ base: 1, md: 1 }}>
        <Stack>
          <form onSubmit={handleSubmit(onSubmitProduct)}>
            <SimpleGrid gap={4}>

              <FormControl isInvalid={errors.name}>
                <FormLabel htmlFor="name">Nombre</FormLabel>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  size="sm"
                  autoComplete="off"
                  {...register('name', {
                    required: 'Este campo es requerido',
                    minLength: {
                      value: 3,
                      message: 'El mínimo de caracteres es 3',
                    },
                  })}
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl>
        <FormLabel>Categoría</FormLabel>
        <Select  {...register('category', {
                    required: 'Este campo es requerido'})}>
          <option value="seleccionar" defaultValue>Seleccionar</option>
          <option value="Remeras">Remeras</option>
          <option value="Conjuntos">Conjuntos</option>
          <option value="Sacos">Sacos</option>
          <option value="Vestidos">Vestidos</option>
          <option value="Camisas">Camisas</option>
          <option value="Sudaderas">Sudaderas</option>
          <option value="Camperas">Camperas</option>
        </Select>
      </FormControl>

      <FormControl isInvalid={errors.image}>
                <FormLabel htmlFor="image">Imágen (url)</FormLabel>
                <Input
                  type="text"
                  name="image"
                  id="image"
                  size="sm"
                  autoComplete="off"
                  {...register('image', {
                    required: 'Este campo es requerido',
                    minLength: {
                      value: 3,
                      message: 'El mínimo de caracteres es 3',
                    },
                  })}
                />
                <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
              </FormControl>

      <FormControl isInvalid={errors.price}>
                <FormLabel htmlFor="price">Price</FormLabel>
                <Input
                  type="number"
                  name="price"
                  id="price"
                  size="sm"
                  
                  {...register('price', {
                    required: 'Este campo es requerido',
                    pattern: {
                      // value: /@[0-9.,-]/,
                      message: 'Este precio no es válido',
                    },
                  })}
                />
                <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.description}>
                <FormLabel htmlFor="address">Descripción</FormLabel>
                <Textarea
                    placeholder='Descripción'
                    name="description"
                    id="description"
                    size='sm'
                    autoComplete="off"
                    {...register('description', {
                      required: 'Este campo es requerido',
                      minLength: {
                        value: 25,
                        message: 'El mínimo de caracteres es 25',
                      },
                    })}
                  />
                <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
              </FormControl>
             
              {error && <Text>Se produjo un error</Text>}
              <Button
                type="submit"
                w="full"
                size="lg"
                py={6}
                bg="black"
                color="white"
                textTransform="uppercase"
                _hover={{
                  transform: 'translateY(2px)',
                  boxShadow: 'lg',
                }}
                fontSize={{ base: '11px', sm: '18px', md: '18px', lg: '18px' }}
                isDisabled={!isDirty}
              >
                {loading ? 'Enviando...' : 'Enviar'}
              </Button>
            </SimpleGrid>
          </form>
        </Stack>
      </SimpleGrid>
    </SimpleGrid>
    </Flex>
  )
}
