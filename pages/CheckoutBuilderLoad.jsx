
import React, { useState } from 'react'
import {motion} from "framer-motion";
import Checkout from './Checkout';
import { useRouter } from 'next/router';

const CheckoutSetUpBuilderLoad = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center h-screen"
    >
      Retrieving authentication data. Please wait...
    </motion.div>
  );
};
const CheckoutBuilder = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { data } = router.query;
    const parsedData = data ? JSON.parse() : [];
    console.log(parsedData);

  // 3 seconds delay
  setTimeout(() => {
    setLoading(true);
    // Put the data to the next page
    // router.push({
    //   pathname: '/Auth/Registrationstepper',
    //   query: { data: data },
    // });
  }, 3000);

  return (
    <div>
        {loading ? <Checkout /> : <CheckoutSetUpBuilderLoad />}
    </div>
   )
}

export default CheckoutBuilder;