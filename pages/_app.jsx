import CartProvider from "../contexts/CartContext";
import ProductProvider from "../contexts/ProductContext";
import SidebarProvider from "../contexts/SidebarContext";
import React from "react";
import { useRouter } from "next/router";
import '../styles/globals.css';
import Sidebar from "../components/Sidebar";

export default function App({ Component, pageProps }) {
  const router = useRouter();
	return (
		 <SidebarProvider>
          <CartProvider>
            <ProductProvider>
				<Component {...pageProps} />
         {router.route !== '/product/[id]' && <Sidebar />}
            </ProductProvider>
          </CartProvider>
        </SidebarProvider>
	); 
}