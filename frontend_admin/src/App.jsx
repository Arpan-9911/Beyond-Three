import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LanguageProvider from "./context/LanguageProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import Reviews from './pages/Reviews';
import Appointments from './pages/Appointments';
import Profile from './pages/Profile';
import ProtectedRoute from './ProtectedRoute';
import { useDispatch } from 'react-redux';
import { getProfile } from './functions/auth';
import { allHeroCarousel } from './functions/heroCarousel';
import { allNews } from './functions/news';
import { allEvents } from './functions/event';
import { allProjectCategories, allProjects } from './functions/projects';
import { allBlogs } from './functions/blogs';
import { allTours } from './functions/tours';
import { allMedia } from './functions/media';

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProfile())
    dispatch(allHeroCarousel())
    dispatch(allNews())
    dispatch(allEvents())
    dispatch(allProjectCategories())
    dispatch(allProjects())
    dispatch(allBlogs())
    dispatch(allTours())
    dispatch(allMedia())
  }, [dispatch])
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={2000} />
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/hero-carousel" element={<ProtectedRoute><HeroCarousel /></ProtectedRoute>} />
          <Route path="/news" element={<ProtectedRoute><News /></ProtectedRoute>} />
          <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
          <Route path="/about-us" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
          <Route path="/blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
          <Route path="/join-us" element={<ProtectedRoute><Join /></ProtectedRoute>} />
          <Route path="/tours" element={<ProtectedRoute><Tours /></ProtectedRoute>} />
          <Route path="/media" element={<ProtectedRoute><Media /></ProtectedRoute>} />
          <Route path="/reviews" element={<ProtectedRoute><Reviews /></ProtectedRoute>} />
          <Route path="/appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  )
}

export default App