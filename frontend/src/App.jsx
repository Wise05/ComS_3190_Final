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
import Profile from "./components/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="/artists" element={<Artists />} />
          {/* Shop route with possible nested routes */}
          <Route path="/shop" element={<Shop />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
