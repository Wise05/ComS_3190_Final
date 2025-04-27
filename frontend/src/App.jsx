// Zephaniah Gustafson and Koushik Shaganti
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/Login";
import Artists from "./components/Artists";
import Shop from "./components/Shop";
import Survey from "./components/Survey";
import About from "./components/About";
import SignIn from "./components/SignIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout route wraps the main content */}
        <Route path='/' element={<Layout />}>
          {/* Home route */}
          <Route index element={<Home />} />
          {/* Login route */}
          <Route path='/login' element={<Login />} />
          {/* Artists route */}
          <Route path='/artists' element={<Artists />} />
          {/* Shop route with possible nested routes */}
          <Route path='/shop' element={<Shop />} />
          {/* Survey route */}
          <Route path='/survey' element={<Survey />} />
          {/* About route */}
          <Route path='/about' element={<About />} />
          {/* SignIn route */}
          <Route path='/signin' element={<SignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
