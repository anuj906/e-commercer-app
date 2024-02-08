import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { Login, Home } from "./pages";

function App() {
  return (
    <BrowserRouter>


      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
  
    </BrowserRouter>
  );
}

export default App;
