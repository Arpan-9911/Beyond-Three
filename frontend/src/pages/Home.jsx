import React from 'react'
import Header from '../components/layout/Header'
import Hero from '../components/home/Hero'
import About from '../components/home/About'
import Footer from '../components/layout/Footer'
import Resolution from '../components/home/Resolution'
import Youth from '../components/home/Youth'
import Testimonials from '../components/home/Testimonials'
import NewsEvents from '../components/home/NewsEvents'
import FeaturedMedia from '../components/home/FeaturedMedia'

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <NewsEvents />
      <FeaturedMedia />
      <Resolution />
      <Youth />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default Home