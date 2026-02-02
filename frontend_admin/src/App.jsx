import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LanguageProvider from "./context/LanguageProvider";
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import HeroCarousel from './pages/HeroCarousel';

const App = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/hero-carousel' element={<HeroCarousel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  )
}

export default App