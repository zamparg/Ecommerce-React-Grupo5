import { Center, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { Filters } from "../components/Filters";
import { IsLoading } from "../components/IsLoading";
import { Pagination } from "../components/Pagination";
import { ProductCard } from "../components/ProductCard";
import { getAllProducts } from "../services/products";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // Número de productos por página
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    maxPrice: "",
    sortPrice: "",
  });

  useEffect(() => {
    const getProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        let filteredProducts = allProducts;
        if (filters.name) {
          filteredProducts = filteredProducts.filter((product) =>
            product.name.toLowerCase().includes(filters.name.toLowerCase())
          );
        }
        if (filters.category && filters.category !== "seleccionar") {
          filteredProducts = filteredProducts.filter(
            (product) => product.category === filters.category
          );
        }
        if (filters.maxPrice) {
          filteredProducts = filteredProducts.filter(
            (product) => product.price <= parseInt(filters.maxPrice)
          );
        }
        if (filters.sortPrice) {
          if (filters.sortPrice == "asc") {
            filteredProducts = filteredProducts.sort(
              (a, b) => a.price - b.price
            );
          } else {
            if (filters.sortPrice == "desc") {
              filteredProducts = filteredProducts.sort(
                (a, b) => b.price - a.price
              );
            }
          }
        }
        setProducts(filteredProducts);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, [filters]);

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Filters filters={filters} setFilters={setFilters} />
      <Flex flexWrap="wrap" justifyContent="center" gap={4} m={6}>
        {error && <Text>Ha ocurrido un error</Text>}
        {loading && <IsLoading />}
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {!loading && !currentProducts.length && (
          <Text>No se encontraron productos</Text>
        )}
      </Flex>
      <Center>
        <Pagination
          currentPage = {currentPage}
          totalPages = {Math.ceil(products.length / productsPerPage)}
          onChangePage = {handleChangePage}
        />
      </Center>
    </>
  );
};
