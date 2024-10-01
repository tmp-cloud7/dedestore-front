import React from 'react'
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Shop from "./pages/shop";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {Helmet} from "react-helmet";

function App() {
  return (
    <>
    <Helmet>
            <meta charSet="utf-8" />
            <title>Trillium Interiors</title>
            <link rel="canonical" href="http://mysite.com/example" />
            <meta name="description" content="Helmet application" />
      </Helmet>
     <BrowserRouter>     
        <Routes>
          <Route index element = {<Home />} />
          <Route path = "/home" element = {<Home />} />
          <Route path = "/login" element = {<Login />} />
          <Route path = "/register" element = {<Register />} />
          <Route path = "/shop" element = {<Shop />} />
        </Routes>
     </BrowserRouter>
   
   </>
  );
}

export default App;
