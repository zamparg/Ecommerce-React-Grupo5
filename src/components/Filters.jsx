import {
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
} from '@chakra-ui/react'

export const Filters = ({ filters, setFilters }) => {
  return (
    <SimpleGrid
      w="full"
      columns={{ base: 1, md: 3 }}
      gap={{ base: 4, md: 9 }}
      p={{ base: '20px 20px', md: '20px 80px' }}
    >
      <FormControl>
        <FormLabel>Nombre</FormLabel>
        <Input
          name="name"
          type="text"
          placeholder="Buscar"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Categoría</FormLabel>
        <Select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="seleccionar">Seleccionar</option>
          <option value="Calzado">Calzado</option>
          <option value="Accesorios">Accesorios</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Precio Máximo</FormLabel>
        <Input
          placeholder="Hasta"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        />
      </FormControl>
    </SimpleGrid>
  )
}
