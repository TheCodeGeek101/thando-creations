import CartProvider from "../contexts/CartContext";
import ProductProvider from "../contexts/ProductContext";
import SidebarProvider from "../contexts/SidebarContext";
import React from "react";
import '../styles/globals.css';
import { StoreProvider } from "../contexts/StoreContext";
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { SnackbarProvider } from 'notistack';
import createCache from '@emotion/cache';

const clientSideEmotionCache = createCache({ key: 'css' });

export default function App({ Component, pageProps, emotionCache = clientSideEmotionCache, }) {

	return (
		 <SidebarProvider>
          <CartProvider>
            <ProductProvider>
              <SnackbarProvider
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              >
              <StoreProvider>
                <PayPalScriptProvider deferLoading={true}>
		        		  <Component {...pageProps} />
                </PayPalScriptProvider>
              </StoreProvider>
             </SnackbarProvider>
            </ProductProvider>
          </CartProvider>
      </SidebarProvider>
	); 
}