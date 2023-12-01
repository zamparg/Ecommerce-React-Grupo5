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
      columns={{ base: 1, md: 4 }}
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
          <option value="seleccionar" defaultValue>Seleccionar</option>
          <option value="Remeras">Remeras</option>
          <option value="Conjuntos">Conjuntos</option>
          <option value="Sacos">Sacos</option>
          <option value="Vestidos">Vestidos</option>
          <option value="Camisas">Camisas</option>
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

      <FormControl>
        <FormLabel>Ordenar Por</FormLabel>
        <Select
          value={filters.sortPrice}
          onChange={(e) => setFilters({ ...filters, sortPrice: e.target.value })}
        >
          <option value="none" defaultValue>Ninguno</option>
          <option value="asc">Menor Precio</option>
          <option value="desc">Mayor Precio</option>
        </Select>
      </FormControl>

    </SimpleGrid>
  )
}
