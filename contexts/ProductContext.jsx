import React, { createContext, useEffect, useState } from 'react';
// import { client } from '../sanity/lib/client';
import { createClient } from 'next-sanity';
export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);


const client = createClient({
  projectId: "fauat7no",
  dataset: "production",
  apiVersion: "2023-10-30",
  useCdn: true
});

  useEffect(() => {
    
    // fetch products from sanity studio
    const fetchProducts = () => {
      try {
        client.fetch(`*[_type == "product"]{
            rating,
            name,
            category,
            brand,
            description,
            price,
            _id,
            "slug": slug.current,
            "image": image.asset->url
          }`)
        .then((response)  => {
          const data = JSON.stringify(response);
           console.log("data from sanity:" + data);
           setProducts(response);    
        })
        .catch((error) => {
          console.error(error);
        });
      } catch (error) {
        // setProductState({ loading: false, error: error.message });
        console.error("Error fetching data: " + error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
