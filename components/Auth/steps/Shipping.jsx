import React, { useContext, useState } from 'react'
import { Store } from '../../../contexts/StoreContext';
import jsCookie from 'js-cookie';
import StepsAnimateFramer from '../StepsAnimateFramer';

const Shipping = () => {
    const {state, dispatch} = useContext(Store);
     const {
    userInfo,
    cart: { shippingAddress },
    } = state;
   const [fullname, setFullName] = useState('');
   const [phone, setPhone] = useState('');
   const [address, setAddress] = useState('');
   const [city, setCity] = useState('');
   const [postalCode, setPostalCode] = useState('');
   const [country, setCountry] = useState('');

    const countryCodes = [
  { code: '+1', country: 'USA' },
  { code: '+44', country: 'UK' },
  { code: '+265', country: 'MWI' },
  // Add more country codes as needed
];

    const handleSubmit = () => {
        dispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {fullname, phone, city, postalCode,address,country},
            });
            jsCookie.set(
            'shippingAddress',
            JSON.stringify({fullname, phone, city, postalCode, address, country}));
            console.log(1 + "Shipping data: " + JSON.stringify({fullname, phone, city, postalCode,address,country}));
    }
 
    return (
        <StepsAnimateFramer>
        <div className='flex flex-col'>
                <form onSubmit={handleSubmit}>
      
             <div className="w-full mx-2 flex-1">
                <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">

                    {" "}
                    Fullname
                </div>
                <div className="bg-white my-2 p-1 border border-gray-200 rounded">
                    <input type="text"
                        onChange={(e) => setFullName(e.target.value)}
                        value={fullname}
                        name='Fullname'
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
                        onChange={(e) => setPhone(e.target.value) }
                        value={phone}
                        name='Phone number'
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
                    <input type="text"
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
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
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                        name='Country'
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
                        onChange={(e) => setPostalCode(e.target.value)}
                        value={postalCode}
                        name='Postal code'
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
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        name='address'
                        placeholder='Address'
                        className='p-1 appearance-none outline-none w-full text-gray-800'
                    />
                    
                </div>

             </div>
        </form>

        </div>
        </StepsAnimateFramer>

  )
}

export default Shipping;