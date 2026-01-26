import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LanguageProvider from "./context/LanguageProvider";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import Projects from "./pages/Projects";

const App = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  );
};

export default App;