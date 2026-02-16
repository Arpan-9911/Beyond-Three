import React from 'react'
import Header from '../components/layout/Header'
import Hero from '../components/home/Hero'
import About from '../components/home/About'
import Footer from '../components/layout/Footer'
import Resolution from '../components/home/Resolution'
import Youth from '../components/home/Youth'
import Testimonials from '../components/home/Testimonials'
import NewsEvents from '../components/home/NewsEvents'

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <NewsEvents />
      <About />
      <Resolution />
      <Youth />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default Home