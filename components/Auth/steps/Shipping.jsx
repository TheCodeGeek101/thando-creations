import React, { useContext, useState } from 'react'
import jsCookie from 'js-cookie';
import StepsAnimateFramer from '../StepsAnimateFramer';
import { Store } from '../../../contexts/StoreContext';

const Shipping = () => {
    const { setShippingAddress } = useContext(Store);
    const [data, setData] = useState({
        fullname:'',
        phone:'',
        city:'',
        postalCode:'',
        country:'',
        address:''
    });

    const countryCodes = [
  { code: '+1', country: 'USA' },
  { code: '+44', country: 'UK' },
  { code: '+265', country: 'MWI' },
  // Add more country codes as needed
];

    const handleChange = (e) => {
             const { name, value } = e.target;
            // const data = {fullname, phone, city, postalCode, address, country}
             setData({...data, [name]: value});
            setShippingAddress(data);
            jsCookie.set('shippingAddress', JSON.stringify(data));
            console.log("cart after shipping address is: " + JSON.stringify(data));
            // console.log(1 + "Shipping data: " + JSON.stringify({fullname, phone, city, postalCode,address,country}));
    }
 
    return (
        <StepsAnimateFramer>
        <div className='flex flex-col'>
                {/* <form onChange={handleChange}> */}
      
             <div className="w-full mx-2 flex-1">
                <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">

                    {" "}
                    Fullname
                </div>
                <div className="bg-white my-2 p-1 border border-gray-200 rounded">
                    <input type="text"
                        onChange={handleChange}
                        value={data.fullname}
                        name='fullname'
                        placeholder='Fullname'
                        className='p-1 appearance-none outline-none w-full text-gray-800'
                    />
                </div>
             </div>
              <div className="w-full mx-2 flex-1">
                <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
                    {" "}
                    Phone number
                </div>
                <div className="bg-white my-2 p-1 border border-gray-200 rounded">
                    <input type="text"
                        onChange={handleChange}
                        value={data.phone}
                        name='phone'
                        placeholder='Phone number'
                        className='p-1 appearance-none outline-none w-full text-gray-800'
                    />
                </div>
             </div>
              <div className="w-full mx-2 flex-1">
                <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
                    {" "}
                    City
                </div>
                <div className="bg-white my-2 p-1 border border-gray-200 rounded">
                    <input
                     type="text"
                        onChange={handleChange}
                        value={data.city}
                        name='city'
                        placeholder='City'
                        className='p-1 appearance-none outline-none w-full text-gray-800'
                    />
                </div>
             </div>
              <div className="w-full mx-2 flex-1">
                <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
                    {" "}
                    Country
                </div>
                <div className="bg-white my-2 p-1 border border-gray-200 rounded">
                    <input type="text"
                        onChange={handleChange}
                        value={data.country}
                        name='country'
                        placeholder='Country'
                        className='p-1 appearance-none outline-none w-full text-gray-800'
                    />
                </div>
             </div>
              <div className="w-full mx-2 flex-1">
                <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
                    {" "}
                    Postal Code
                </div>
                <div className="bg-white my-2 p-1 border border-gray-200 rounded">
                    <input type="text"
                        onChange={handleChange}
                        value={data.postalCode}
                        name='postalCode'
                        placeholder='Postal Code'
                        className='p-1 appearance-none outline-none w-full text-gray-800'
                    />
                </div>
             </div>
              <div className="w-full mx-2 flex-1">
                <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
                    {" "}
                    Address
                </div>
                <div className="bg-white my-2 p-1 border border-gray-200 rounded">
                    <input type="text"
                        onChange={handleChange}
                        value={data.address}
                        name='address'
                        placeholder='Address'
                        className='p-1 appearance-none outline-none w-full text-gray-800'
                    />
                    
                </div>

             </div>
        {/* </form> */}

        </div>
        </StepsAnimateFramer>

  )
}

export default Shipping;