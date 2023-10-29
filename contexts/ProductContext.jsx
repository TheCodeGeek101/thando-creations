import React, { createContext, useEffect, useState } from 'react';
import { client } from '../sanity/lib/client';

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [productState, setProductState] = useState({
    products: [],
    error: '',
    loading: true
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await client.fetch(`*[_type == "product"]`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setProductState({ products, loading: false });
      } catch (error) {
        setProductState({ loading: false, error: error.message });
        console.error("Error fetching data: " + error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ productState }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
