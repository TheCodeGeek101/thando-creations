import React from "react";
import Home from "../components/Home"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import Footer from "../components/Footer";
import jsCookie from "js-cookie";

const Index = () => {
	
	return(
		<>
			<Header/>
			<Home/>

			<Sidebar/>
			<Footer/>
		</>
	)
}
export default Index;