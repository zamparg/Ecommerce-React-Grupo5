import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Textarea,
  Input,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { createContact } from '../services/products'


export const Contact = () => {
 
  const { register, handleSubmit, formState } = useForm()

  const { errors, isDirty } = formState

  const toast = useToast()

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmitOrder = async (data) => {
    setLoading(true)
    try {
      await createContact({
        name: data.name,
        email: data.email,
        comment: data.comment,
      })
      navigate('/')
      toast({
        title: 'Tu Mensaje fue enviado con éxito',
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
    <SimpleGrid p={{ base: '0', md: '24px' }}>
      <Heading as="h2" size="lg" fontWeight="normal" pl={6}>
        Contacto
      </Heading>
      <SimpleGrid p={6} gap={6} columns={{ base: 1, md: 2 }}>

        <Stack>
          <form onSubmit={handleSubmit(onSubmitOrder)}>
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
              <FormControl isInvalid={errors.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  size="sm"
                  
                  {...register('email', {
                    required: 'Este campo es requerido',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Este email no es válido',
                    },
                  })}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.comment}>
                <FormLabel htmlFor="address">Mensaje</FormLabel>
                <Textarea
                    placeholder='Mensaje'
                    name="comment"
                    id="comment"
                    size='sm'
                    autoComplete="off"
                    {...register('comment', {
                      required: 'Este campo es requerido',
                      minLength: {
                        value: 25,
                        message: 'El mínimo de caracteres es 25',
                      },
                    })}
                  />
                <FormErrorMessage>{errors.comment?.message}</FormErrorMessage>
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
  )
}
