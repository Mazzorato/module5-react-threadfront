import { useState } from "react";
import "./App.css";
import { Register } from "./components/auth/register.jsx";
import { Login } from "./components/auth/login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
