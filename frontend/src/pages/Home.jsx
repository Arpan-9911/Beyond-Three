import React from 'react'
import Header from '../components/layout/Header'
import Hero from '../components/home/Hero'
import About from '../components/home/About'
import Footer from '../components/layout/Footer'

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Footer />
    </div>
  )
}

export default Home