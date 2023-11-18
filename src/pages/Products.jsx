import { Flex, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { Filters } from '../components/Filters'
import { IsLoading } from '../components/IsLoading'
import { ProductCard } from '../components/ProductCard'
import { getAllProducts } from '../services/products'

export const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [filters, setFilters] = useState({
    name: '',
    category: '',
    maxPrice: '',
  })

  useEffect(() => {
    const getProducts = async () => {
      try {
        const allProducts = await getAllProducts()
        let filteredProducts = allProducts
        if (filters.name) {
          filteredProducts = filteredProducts.filter((product) =>
            product.name.toLowerCase().includes(filters.name.toLowerCase())
          )
        }
        if (filters.category && filters.category !== 'seleccionar') {
          filteredProducts = filteredProducts.filter(
            (product) => product.category === filters.category
          )
        }
        if (filters.maxPrice) {
          filteredProducts = filteredProducts.filter(
            (product) => product.price <= parseInt(filters.maxPrice)
          )
        }
        setProducts(filteredProducts)
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    getProducts()
  }, [filters])

  return (
    <>
      <Filters filters={filters} setFilters={setFilters} />
      <Flex flexWrap="wrap" justifyContent="center" gap={4} m={6}>
        {error && <Text>Ha ocurrido un error</Text>}
        {loading && <IsLoading />}
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {!loading && !products.length && (
          <Text>No se encontraron productos</Text>
        )}
      </Flex>
    </>
  )
}
