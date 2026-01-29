import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LanguageProvider from "./context/LanguageProvider";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import Projects from "./pages/Projects";
import Events from "./pages/Events";
import Blogs from "./pages/Blogs";
import News from "./pages/News";
import JoinUs from "./pages/JoinUs";
import Tours from "./pages/Tours";
import Media from "./pages/Media";
import Contact from "./pages/Contact";
import Appointment from "./pages/Appointment";

const App = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:tab" element={<Projects />} />
          <Route path="/projects/:tab/:id" element={<Projects />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:tab" element={<Events />} />
          <Route path="/events/:tab/:id" element={<Events />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<Blogs />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<News />} />
          <Route path="/join" element={<JoinUs />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:id" element={<Tours />} />
          <Route path="/media" element={<Media />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  );
};

export default App;