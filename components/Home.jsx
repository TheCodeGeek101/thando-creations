import React, { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import Product from './Product/product';
import Hero from "./Hero";

const Home = () => {
  // get all products from the product context
  const { products } = useContext(ProductContext);
  console.log(2 + "Products from context are:" + products);

  // get only men's & women's clothing category
  // const filteredProducts = productState.filter(item => (
  //   item.category === "men's clothing" ||
  //   item.category === 'jewelry'
  // ));

  // destructre productState

  // const { loading, error, products } = productState;
  // console.log("products are" + products);

  // console.log("Filtered products are:", filteredProducts);

  return (
    <div>
      <Hero />
      <section className='py-16'>
        <h1 className="flex justify-center text-3xl font-bold items-center capitalize text-gray-800">Our Products</h1>
        <div className="container mx-auto">
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
            {products.map(product => {
              // console.log(3 + "individual products are:" + product);
              return <Product product={product} key={product._id} />
            })}
          </div>
        </div>
      </section>

    </div>
  )
};

export default Home;
