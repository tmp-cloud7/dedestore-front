import React from 'react'
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Product from "./Pages/Product";
import Shop from "./Pages/Shop";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {Helmet} from "react-helmet";
import Dashboard from './Pages/Dashboard';
import Logout from './Pages/Logout';
import RouteProtection from './Components/RouteProtection';

function App() {
  return (
    <>
    <Helmet>
            <meta charSet="utf-8" />
            <title>DeDe Store</title>
            <link rel="canonical" href="http://mysite.com/example" />
            <meta name="description" content="Helmet application" />
      </Helmet>
     <BrowserRouter>     
        <Routes>
          <Route index element = {<Home />}/>
          <Route path = "/login" element = {<Login />}/>
          <Route path = "/logout" element = {<Logout />}/>
          <Route path = "/register" element = {<Register />}/>
          <Route path = "/dashboard" element = {<RouteProtection cmp = {Dashboard} />}/>
          <Route path = "/product" element = {<Product/>} />
          <Route path = "/shop" element = {<Shop />} />
        </Routes>
     </BrowserRouter>
   
   </>
  );
}

export default App;
