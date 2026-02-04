import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LanguageProvider from "./context/LanguageProvider";
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import HeroCarousel from './pages/HeroCarousel';
import News from './pages/News';
import Events from './pages/Events';
import About from './pages/About';
import Projects from './pages/Projects';
import Blogs from './pages/Blogs';
import Join from './pages/Join';
import Tours from './pages/Tours';
import Media from './pages/Media';
import Contact from './pages/Contact';
import Appointments from './pages/Appointments';
import Profile from './pages/Profile';

const App = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/hero-carousel' element={<HeroCarousel />} />
          <Route path="/news" element={<News />} />
          <Route path="/events" element={<Events />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/join-us" element={<Join />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/media" element={<Media />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  )
}

export default App