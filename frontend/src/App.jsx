// Zephaniah Gustafson and Koushik Shaganti
import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/Login";
import Artists from "./components/Artists";
import Shop from "./components/Shop";
import Survey from "./components/Survey";
import About from "./components/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Default also accessed by navbar and footbar*/}
          <Route index element={<Home />} />
          {/* Login accessed by navbar */}
          <Route path="/login" element={<Login />} />
          {/* Artists accessed by searching and should have /q=artist_name from search*/}
          <Route path="/artists" element={<Artists />} />
          {/* Shop accessed by navbar, should have internal routes with cart and purchase summary */}
          <Route path="/shop" element={<Shop />} />
          {/* Survey accessed by footbar */}
          <Route path="/survey" element={<Survey />} />
          {/* About accessed by footbar */}
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
