import React, { useRef, useState, useContext, useEffect } from "react";
import { useSnackbar } from 'notistack';
import axios from 'axios';
import jsCookie from 'js-cookie';
import { useRouter } from 'next/router';
import { useForm} from 'react-hook-form';
import { Store } from "../../contexts/StoreContext";
import bcrypt from 'bcryptjs';
import client from "../../utils/client";
import { signToken } from "../../utils/Auth";

const Register = () => {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const router = useRouter();
  const { redirect } = router.query;
  const projectId = 'fauat7no';
  const dataset = 'production';
  const tokenWithWriteAccess = "skJcbJaU4smMnbOfeDj9jjZBJTqkGUNUkPyVK8AgBLyd29xatGTJsDfw35uqBxR3Tjl8X43nJdCzAqierd7JImzGp3BoaBy4DGtPWNZo7lagCCbcQ8cEkDa6Hro4MBAN54fy4YVDn5nooiJtaxmhu89ecbeeIOKbImfk4vcByx2AbAeDXryK";
  const saltRounds = 10;

  const formRef = useRef();  
  const [form, setForm] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    });

  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value})    
  }
    //redirect user to homepage   
    useEffect(() => {
        if (userInfo) {
        router.push(redirect || '/');
        }
    }, [router, userInfo, redirect]);
    
    // form validation
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const { enqueueSnackbar } = useSnackbar();

    const submitHandler = async (e) => {
        // e.preventDefault();
        setLoading(true);
            
        // check fields
        console.log(1 + "name: " + form.name +  "email: " + form.email + "password: " + form.password );

        // check if passwords match
        if (form.password !== form.confirmPassword) {
            enqueueSnackbar("Passwords don't match", { variant: 'error' });
            return;
        }

        // check if fields are empty
        if(!form.name && !form.email && !form.password && form.confirmPassword){
            enqueueSnackbar("Fields empty!..please fill out the fields", { variant: 'error' });
            setLoading(false);
         }

        // check if the user exists
        const existUser = await client.fetch(
            `*[_type == "user" && email == $email][0]`,
            {
            email:form.email,
            }
        );

        //Notify the client that the user exists 
        if (existUser) {
            enqueueSnackbar("Email already taken", { variant: 'error' });
            return;
            // return res.status(401).send({ message: 'Email aleardy exists' });
        }
       
        //Hash user password 
    bcrypt.hash(form.password, saltRounds, async function (err, hash){
     if (err) {

        // Handle error
         enqueueSnackbar("Error hashing password", { variant: 'error' });
      } 
      
      else {

        // Use the generated hash
        console.log(hash);
        console.log('THE HASHED PASSWORD IS:' + hash);
        console.log("client credentials:" + client.projectId);
        const data = {
          name: form.name,
          email: form.email,
          password: hash
        };

        try {
             // post data to user schema
            const response = await fetch(
                `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}`,
                {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${tokenWithWriteAccess}`,
                },
                body: JSON.stringify({
                    mutations: [
                    {
                        create: {
                        _type: 'user', // Replace with your existing schema type "user"
                        // Map the data fields to the corresponding fields in your "tutor" schema
                        ...data, // Spread the tutorData object to include all fields
                        },
                    },
                    ],
                }),
                }
           );

            // if user has been created in the user schema 
            if(response.ok){
                // stop loading and reset the form 
                setLoading(false)
               
                setForm({
                    name:'',
                    email:'',
                    password:'',
                    confirmPassword:''
                });

                enqueueSnackbar("Account created successfully", { variant: 'success' });
                router.push('/Auth/Index');

                console.log( 4 + "User registered successfully");
                const userId = response.results[0].id;
                
                // check userId
                console.log(4 + "UserID:" + userId );

                const user = {
                    _id: userId,
                    name: form.name,
                    email: form.email,
                    isAdmin: false,
                };

                // check the user
                console.log(5 + "user: " + user);

                const token = signToken(user);
                res.send({ ...user, token });
                dispatch({ type: 'USER_LOGIN', payload: response.data });
                 jsCookie.set('userInfo', JSON.stringify(response.data));
                  // check data
                 console.log(2 + "Data: " +  respsonse);

             }

             else{
               enqueueSnackbar("Error! failed to create account", { variant: 'error' }); 
               console.log("Status: " + response.statusCode);
               return response.statusCode;
             }
                   
        } catch (err) {
            console.error(err);
            // enqueueSnackbar(getError(err), { variant: 'error' });
        }
    }
    });

 };

    return(
        <div>
            <section className="bg-white">
    <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form ref={formRef} onSubmit={handleSubmit(submitHandler)} className="w-full max-w-md">
            <div className="flex justify-center mx-auto">
                <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt=""/>
            </div>
            
            <div className="flex items-center justify-center mt-6">
                {/* <a href="#" className="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300">
                    sign in
                </a> */}

                <a href="#" className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 ">
                    sign up
                </a>
            </div>

            <div className="relative flex items-center mt-8">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </span>
           
                <input  {...register('name')} name="name" value={form.name} onChange={handleChange} required type="text" className="block w-full py-3 text-gray-700 bg-gray-200 border rounded-lg px-11   focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Username"/>
           
             
                </div>

            {/* <label for="dropzone-file" className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>

                <h2 className="mx-3 text-gray-400">Profile Photo</h2>

                <input required id="dropzone-file" type="file" className="hidden" />
            </label> */}

            <div className="relative flex items-center mt-6">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </span>
               

                <input {...register('email')} name="email" value={form.email} onChange={handleChange} required type="email" className="block w-full py-3 text-gray-700 bg-gray-200 border rounded-lg px-11   focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address"/>
         
           
                </div>

            <div className="relative flex items-center mt-4">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </span>
                

                <input {...register('password')} name="password" value={form.password} onChange={handleChange}  required type="password" className="block w-full px-10 py-3 text-gray-700 bg-gray-200 border rounded-lg   focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password"/>
             
                </div>

            <div className="relative flex items-center mt-4">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </span>
                    
                <input {...register('confirmPassword')} name="confirmPassword" value={form.confirmPassword} onChange={handleChange}  required type="password" className="block w-full px-10 py-3 text-gray-700 bg-gray-200 border rounded-lg   focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Confirm Password"/>
               
                </div>

            <div className="mt-6">
                <button type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                     {loading ? 'Creating account...' : 'Create Account'}
                </button>

                <div className="mt-6 text-center ">
                    <a href="/Auth/Index" className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                        Already have an account?
                    </a>
                </div>
            </div>
        </form>
    </div>
</section>
        </div>
    );
}
export default Register;